import { ethers } from 'ethers';
import { BridgeBundledTxRequest, FungibleToken } from 'types';
import { NATIVE } from 'constants/bridges';
import { BridgeConfiguration } from '../config';
import { BridgeError, BridgeErrorType, withBridgeError } from '../errors';
import { isChildETH, isRootIMX } from './utils';

// TODO consider moving these to be member methods of the config class

export async function validateChainConfiguration(config: BridgeConfiguration): Promise<void> {
  const errMessage = 'Please upgrade to the latest version of the Bridge SDK or provide valid configuration';
  const rootNetwork = await withBridgeError<ethers.providers.Network>(
    async () => config.rootProvider.getNetwork(),
    BridgeErrorType.ROOT_PROVIDER_ERROR,
  );

  // Checks chain ID matches
  if (rootNetwork!.chainId.toString() !== config.bridgeInstance.rootChainID) {
    throw new BridgeError(
      `Rootchain provider chainID ${rootNetwork!.chainId} does not match expected chainID ${config.bridgeInstance.rootChainID}. ${errMessage}`,
      BridgeErrorType.UNSUPPORTED_ERROR,
    );
  }

  const childNetwork = await withBridgeError<ethers.providers.Network>(
    async () => config.childProvider.getNetwork(),
    BridgeErrorType.CHILD_PROVIDER_ERROR,
  );

  if (childNetwork.chainId.toString() !== config.bridgeInstance.childChainID) {
    throw new BridgeError(
      `Childchain provider chainID ${childNetwork.chainId} does not match expected chainID ${config.bridgeInstance.childChainID}. ${errMessage} `,
      BridgeErrorType.UNSUPPORTED_ERROR,
    );
  }
}

// Checks that the recipient address can receive the asset being deposited/withdrawn
// This is relevant because the recipient address may be a contract that implements a receive function
export async function checkReceiver(
  tokenSent: FungibleToken,
  destinationChainId: string,
  address: string,
  config: BridgeConfiguration,
): Promise<void> {
  let provider;
  if (destinationChainId === config.bridgeInstance.rootChainID) {
    if (!isChildETH(tokenSent, destinationChainId)) {
      // Return immediately for withdrawing non ETH (i.e. withdrawing ERC20).
      return;
    }
    provider = config.rootProvider;
  } else {
    if (!isRootIMX(tokenSent, destinationChainId)) {
      // Return immediately for depositing non IMX (i.e. depositing ERC20).
      return;
    }
    provider = config.childProvider;
  }

  const bytecode = await provider.getCode(address);
  // No code : "0x" then the address is not a contract so it is a valid receiver.
  if (bytecode.length <= 2) return;

  const ABI = ['function receive()'];
  const contract = new ethers.Contract(address, ABI, provider);

  try {
    // try to estimate gas for the receive function, if it works it exists
    await contract.estimateGas.receive();
  } catch {
    try {
      // if receive fails, try to estimate this way which will work if a fallback function is present
      await provider.estimateGas({ to: address });
    } catch {
      // no receive or fallback
      throw new BridgeError(
        `address ${address} is not a valid receipient`,
        BridgeErrorType.INVALID_RECIPIENT,
      );
    }
  }
}

export async function validateChainIds(
  sourceChainId: string,
  destinationChainId: string,
  config: BridgeConfiguration,
) {
  const isSourceChainRootOrChildChain = sourceChainId === config.bridgeInstance.rootChainID
    || sourceChainId === config.bridgeInstance.childChainID;

  // The source chain must be one of either the configured root chain or the configured child chain
  if (!isSourceChainRootOrChildChain) {
    throw new BridgeError(
      `the sourceChainId ${sourceChainId} is not a valid`,
      BridgeErrorType.INVALID_SOURCE_CHAIN_ID,
    );
  }

  const isDestinationChainRootOrChildChain = destinationChainId === config.bridgeInstance.rootChainID
    || destinationChainId === config.bridgeInstance.childChainID;

  // If the token is not native, it must be a valid address
  if (!isDestinationChainRootOrChildChain) {
    throw new BridgeError(
      `the destinationChainId ${destinationChainId} is not a valid`,
      BridgeErrorType.INVALID_DESTINATION_CHAIN_ID,
    );
  }

  // The source chain and destination chain should not be the same
  if (sourceChainId === destinationChainId) {
    throw new BridgeError(
      `the sourceChainId ${sourceChainId} cannot be the same as the destinationChainId ${destinationChainId}`,
      BridgeErrorType.CHAIN_IDS_MATCH,
    );
  }
}

export async function validateBridgeReqArgs(
  req: BridgeBundledTxRequest,
  config: BridgeConfiguration,
) {
  // Validate chain ID.
  await validateChainIds(req.sourceChainId, req.destinationChainId, config);

  // Validate address
  if (!ethers.utils.isAddress(req.senderAddress) || !ethers.utils.isAddress(req.recipientAddress)) {
    throw new BridgeError(
      `address ${req.senderAddress} or ${req.recipientAddress} is not a valid address`,
      BridgeErrorType.INVALID_ADDRESS,
    );
  }

  // Validate amount
  if (req.amount.isNegative() || req.amount.isZero()) {
    throw new BridgeError(
      `deposit amount ${req.amount.toString()} is invalid`,
      BridgeErrorType.INVALID_AMOUNT,
    );
  }

  // If the token is not native, it must be a valid address
  if (req.token.toUpperCase() !== NATIVE && !ethers.utils.isAddress(req.token)) {
    throw new BridgeError(
      `token address ${req.token} is not a valid address`,
      BridgeErrorType.INVALID_ADDRESS,
    );
  }
}