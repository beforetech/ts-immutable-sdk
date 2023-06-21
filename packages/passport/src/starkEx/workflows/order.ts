import {
  CancelOrderResponse,
  CreateOrderResponse,
  GetSignableCancelOrderRequest,
  GetSignableOrderRequest,
  OrdersApi,
  OrdersApiCreateOrderRequest,
  StarkSigner,
  UnsignedOrderRequest,
} from '@imtbl/core-sdk';
import { convertToSignableToken } from '@imtbl/toolkit';
import { PassportErrorType, withPassportError } from '../../errors/passportError';
import { UserWithEtherKey } from '../../types';
import { ConfirmationScreen, TransactionTypes } from '../../confirmation';

type CancelOrderParams = {
  request: GetSignableCancelOrderRequest;
  ordersApi: OrdersApi;
  user: UserWithEtherKey;
  starkSigner: StarkSigner;
  confirmationScreen: ConfirmationScreen;
};

type CreateOrderParams = {
  request: UnsignedOrderRequest;
  ordersApi: OrdersApi;
  user: UserWithEtherKey;
  starkSigner: StarkSigner;
  confirmationScreen: ConfirmationScreen;
};

const ERC721 = 'ERC721';

export async function createOrder({
  starkSigner,
  user,
  request,
  ordersApi,
  confirmationScreen,
}: CreateOrderParams): Promise<CreateOrderResponse> {
  return withPassportError<CreateOrderResponse>(async () => {
    const ethAddress = user.etherKey;
    const amountSell = request.sell.type === ERC721 ? '1' : request.sell.amount;
    const amountBuy = request.buy.type === ERC721 ? '1' : request.buy.amount;
    const getSignableOrderRequestV3: GetSignableOrderRequest = {
      user: ethAddress,
      amount_buy: amountBuy,
      token_buy: convertToSignableToken(request.buy),
      amount_sell: amountSell,
      token_sell: convertToSignableToken(request.sell),
      fees: request.fees,
      expiration_timestamp: request.expiration_timestamp,
    };

    const getSignableOrderResponse = await ordersApi.getSignableOrder({
      getSignableOrderRequestV3,
    });

    const confirmationResult = await confirmationScreen.startTransaction(
      user.accessToken,
      {
        transactionType: TransactionTypes.createOrder,
        transactionData: getSignableOrderRequestV3,
      },
    );
    if (!confirmationResult.confirmed) {
      throw new Error('Transaction rejected by user');
    }

    const { payload_hash: payloadHash } = getSignableOrderResponse.data;

    const starkSignature = await starkSigner.signMessage(payloadHash);

    const signableResultData = getSignableOrderResponse.data;

    const orderParams: OrdersApiCreateOrderRequest = {
      createOrderRequest: {
        include_fees: true,
        fees: request.fees,
        stark_signature: starkSignature,

        amount_buy: signableResultData.amount_buy,
        amount_sell: signableResultData.amount_sell,
        asset_id_buy: signableResultData.asset_id_buy,
        asset_id_sell: signableResultData.asset_id_sell,
        expiration_timestamp: signableResultData.expiration_timestamp,
        nonce: signableResultData.nonce,
        stark_key: signableResultData.stark_key,
        vault_id_buy: signableResultData.vault_id_buy,
        vault_id_sell: signableResultData.vault_id_sell,
      },
    };
    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${user.accessToken}`,
    };
    const createOrderResponse = await ordersApi.createOrder(orderParams, {
      headers,
    });

    return {
      ...createOrderResponse.data,
    };
  }, PassportErrorType.CREATE_ORDER_ERROR);
}

export async function cancelOrder({
  user,
  starkSigner,
  request,
  ordersApi,
  confirmationScreen,
}: CancelOrderParams): Promise<CancelOrderResponse> {
  return withPassportError<CancelOrderResponse>(async () => {
    const getSignableCancelOrderRequest: GetSignableCancelOrderRequest = {
      order_id: request.order_id,
    };
    const getSignableCancelOrderResponse = await ordersApi.getSignableCancelOrder({
      getSignableCancelOrderRequest,
    });

    const confirmationResult = await confirmationScreen.startTransaction(
      user.accessToken,
      {
        transactionType: TransactionTypes.cancelOrder,
        transactionData: getSignableCancelOrderRequest,
      },
    );
    if (!confirmationResult.confirmed) {
      throw new Error('Transaction rejected by user');
    }

    const { payload_hash: payloadHash } = getSignableCancelOrderResponse.data;

    const starkSignature = await starkSigner.signMessage(payloadHash);

    const headers = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${user.accessToken}`,
    };

    const cancelOrderResponse = await ordersApi.cancelOrder(
      {
        id: request.order_id.toString(),
        cancelOrderRequest: {
          order_id: request.order_id,
          stark_signature: starkSignature,
        },
      },
      { headers },
    );

    return {
      order_id: cancelOrderResponse.data.order_id,
      status: cancelOrderResponse.data.status,
    };
  }, PassportErrorType.CANCEL_ORDER_ERROR);
}