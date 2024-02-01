import {
  Contracts,
  RegisterUserResponse,
  GetSignableRegistrationResponse,
  EthSigner,
  UsersApi,
} from '@imtbl/core-sdk';
import { signRaw } from '@imtbl/toolkit';
import { AxiosError } from 'axios';
import { Signers } from './types';
import { validateChain } from './helpers';
import { ProviderConfiguration } from '../config';

export async function registerOffchain(
  signers: Signers,
  config: ProviderConfiguration,
): Promise<RegisterUserResponse> {
  await validateChain(signers.ethSigner, config.immutableXConfig);
  const usersApi = new UsersApi(config.immutableXConfig.apiConfiguration);

  const userAddress = await signers.ethSigner.getAddress();
  const starkPublicKey = await signers.starkSigner.getAddress();

  const signableResult = await usersApi.getSignableRegistrationOffchain({
    getSignableRegistrationRequest: {
      ether_key: userAddress,
      stark_key: starkPublicKey,
    },
  });

  const { signable_message: signableMessage, payload_hash: payloadHash } = signableResult.data;

  const ethSignature = await signRaw(signableMessage, signers.ethSigner);

  const starkSignature = await signers.starkSigner.signMessage(payloadHash);

  const registeredUser = await usersApi.registerUser({
    registerUserRequest: {
      eth_signature: ethSignature,
      ether_key: userAddress,
      stark_signature: starkSignature,
      stark_key: starkPublicKey,
    },
  });

  return registeredUser.data;
}

export async function isRegisteredOffchain(ethAddress: string, config: ProviderConfiguration): Promise<boolean> {
  try {
    const usersApi = new UsersApi(config.immutableXConfig.apiConfiguration);
    const getUsersResult = await usersApi.getUsers({
      user: ethAddress,
    });
    const { accounts } = getUsersResult.data;

    return accounts?.length > 0;
  } catch (ex) {
    if (ex instanceof AxiosError && ex.response?.status === 404) {
      return false;
    }
    throw ex;
  }
}

interface IsRegisteredCheckError {
  reason: string;
}

export async function isRegisteredOnChain(
  starkPublicKey: string,
  ethSigner: EthSigner,
  config: ProviderConfiguration,
): Promise<boolean> {
  await validateChain(ethSigner, config.immutableXConfig);

  const registrationContract = Contracts.Registration.connect(
    config.immutableXConfig.ethConfiguration.registrationContractAddress,
    ethSigner,
  );

  try {
    return await registrationContract.isRegistered(starkPublicKey);
  } catch (ex) {
    if ((ex as IsRegisteredCheckError).reason === 'USER_UNREGISTERED') {
      return false;
    }
    throw ex;
  }
}

export async function getSignableRegistrationOnchain(
  etherKey: string,
  starkPublicKey: string,
  usersApi: UsersApi,
): Promise<GetSignableRegistrationResponse> {
  const response = await usersApi.getSignableRegistration({
    getSignableRegistrationRequest: {
      ether_key: etherKey,
      stark_key: starkPublicKey,
    },
  });
  return {
    operator_signature: response.data.operator_signature,
    payload_hash: response.data.payload_hash,
    readable_transaction: response.data.readable_transaction,
    verification_signature: response.data.verification_signature,
  };
}