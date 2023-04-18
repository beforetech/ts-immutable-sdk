import { TokenAmount, AnyToken } from '@imtbl/core-sdk';
import { Signers } from './types';
import { Configuration } from '@imtbl/config';
import {
  prepareWithdrawalAction,
  completeEthWithdrawalAction,
  completeERC20WithdrawalAction,
  completeERC721WithdrawalAction,
} from './withdrawal-actions';

type CompleteWithdrawalParams = {
  signers: Signers;
  starkPublicKey: string;
  token: AnyToken;
  config: Configuration;
};

type PrepareWithdrawalParams = {
  signers: Signers;
  withdrawal: TokenAmount;
  config: Configuration;
};

export async function prepareWithdrawal({
  signers,
  withdrawal,
  config,
}: PrepareWithdrawalParams) {
  const starkExConfig = config.getStarkExConfig();

  return prepareWithdrawalAction({
    signers,
    config: starkExConfig,
    ...withdrawal,
  });
}

export async function completeWithdrawal({
  signers: { ethSigner },
  starkPublicKey,
  token,
  config,
}: CompleteWithdrawalParams) {
  switch (token.type) {
    case 'ETH':
      return completeEthWithdrawalAction({ ethSigner, starkPublicKey, config });
    case 'ERC20':
      return completeERC20WithdrawalAction({
        ethSigner,
        starkPublicKey,
        token,
        config,
      });
    case 'ERC721':
      return completeERC721WithdrawalAction({
        ethSigner,
        starkPublicKey,
        token,
        config,
      });
  }
}