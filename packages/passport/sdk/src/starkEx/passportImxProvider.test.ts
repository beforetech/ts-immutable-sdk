import { Environment, ImmutableConfiguration } from '@imtbl/config';
import { ImmutableXClient } from '@imtbl/immutablex-client';
import {
  CancelOrderResponse,
  CreateOrderResponse,
  CreateTradeResponse,
  CreateTransferResponse,
  CreateTransferResponseV1,
  GetSignableCancelOrderRequest,
  GetSignableTradeRequest,
  NftTransferDetails,
  UnsignedExchangeTransferRequest,
  UnsignedOrderRequest,
  UnsignedTransferRequest,
} from '@imtbl/core-sdk';
import { mockUserImx } from '../test/mocks';
import { PassportError, PassportErrorType } from '../errors/passportError';
import { PassportImxProvider } from './passportImxProvider';
import {
  batchNftTransfer,
  transfer,
  cancelOrder,
  createOrder,
  exchangeTransfer,
  createTrade,
} from './workflows';
import { ConfirmationScreen } from '../confirmation';
import { PassportConfiguration } from '../config';

jest.mock('./workflows');
describe('PassportImxProvider', () => {
  afterEach(jest.resetAllMocks);

  let passportImxProvider: PassportImxProvider;

  const immutableXClient = new ImmutableXClient({
    baseConfig: new ImmutableConfiguration({
      environment: Environment.SANDBOX,
    }),
  });

  const confirmationScreen = new ConfirmationScreen({} as PassportConfiguration);

  const mockStarkSigner = {
    signMessage: jest.fn(),
    getAddress: jest.fn(),
  };

  const imxPublicApiDomain = 'http://imxPublicApiDomain';

  beforeEach(() => {
    passportImxProvider = new PassportImxProvider({
      user: mockUserImx,
      starkSigner: mockStarkSigner,
      confirmationScreen,
      immutableXClient,
      imxPublicApiDomain,
    });
  });

  describe('constructor', () => {
    it('sets the private properties', () => {
      // @ts-ignore
      expect(passportImxProvider.user).toEqual(mockUserImx);
      // @ts-ignore
      expect(passportImxProvider.starkSigner).toEqual(mockStarkSigner);
      // @ts-ignore
      expect(passportImxProvider.confirmationScreen).toEqual(confirmationScreen);
      // @ts-ignore
      expect(passportImxProvider.immutableXClient).toEqual(immutableXClient);
    });
  });

  describe('transfer', () => {
    it('calls transfer workflow', async () => {
      const returnValue = {} as CreateTransferResponseV1;
      const request = {} as UnsignedTransferRequest;

      (transfer as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.transfer(request);

      expect(transfer as jest.Mock).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        transfersApi: immutableXClient.transfersApi,
        // @ts-ignore
        guardianClient: passportImxProvider.guardianClient,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('registerOffchain', () => {
    it('should throw error', async () => {
      expect(passportImxProvider.registerOffchain).toThrow(
        new PassportError(
          'Operation not supported',
          PassportErrorType.OPERATION_NOT_SUPPORTED_ERROR,
        ),
      );
    });
  });

  describe('isRegisteredOnchain', () => {
    it('should throw error', async () => {
      expect(passportImxProvider.isRegisteredOnchain).toThrow(
        new PassportError(
          'Operation not supported',
          PassportErrorType.OPERATION_NOT_SUPPORTED_ERROR,
        ),
      );
    });
  });

  describe('createOrder', () => {
    it('calls createOrder workflow', async () => {
      const returnValue = {} as CreateOrderResponse;
      const request = {} as UnsignedOrderRequest;

      (createOrder as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.createOrder(request);

      expect(createOrder).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        ordersApi: immutableXClient.ordersApi,
        // @ts-ignore
        guardianClient: passportImxProvider.guardianClient,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('cancelOrder', () => {
    it('calls cancelOrder workflow', async () => {
      const returnValue = {} as CancelOrderResponse;
      const request = {} as GetSignableCancelOrderRequest;

      (cancelOrder as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.cancelOrder(request);

      expect(cancelOrder).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        ordersApi: immutableXClient.ordersApi,
        // @ts-ignore
        guardianClient: passportImxProvider.guardianClient,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('createTrade', () => {
    it('calls createTrade workflow', async () => {
      const returnValue = {} as CreateTradeResponse;
      const request = {} as GetSignableTradeRequest;

      (createTrade as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.createTrade(request);

      expect(createTrade).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        tradesApi: immutableXClient.tradesApi,
        // @ts-ignore
        guardianClient: passportImxProvider.guardianClient,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('batchNftTransfer', () => {
    it('calls batchNftTransfer workflow', async () => {
      const returnValue = {} as CreateTransferResponse;
      const request = [] as NftTransferDetails[];

      (batchNftTransfer as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.batchNftTransfer(request);

      expect(batchNftTransfer).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        transfersApi: immutableXClient.transfersApi,
        // @ts-ignore
        guardianClient: passportImxProvider.guardianClient,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('exchangeTransfer', () => {
    it('calls the exchangeTransfer workflow', async () => {
      const returnValue = {} as CreateTransferResponseV1;
      const request = {} as UnsignedExchangeTransferRequest;

      (exchangeTransfer as jest.Mock).mockResolvedValue(returnValue);
      const result = await passportImxProvider.exchangeTransfer(request);

      expect(exchangeTransfer).toHaveBeenCalledWith({
        request,
        user: mockUserImx,
        starkSigner: mockStarkSigner,
        exchangesApi: immutableXClient.exchangeApi,
      });
      expect(result).toEqual(returnValue);
    });
  });

  describe('deposit', () => {
    it('should throw error', async () => {
      expect(passportImxProvider.deposit).toThrow(
        new PassportError(
          'Operation not supported',
          PassportErrorType.OPERATION_NOT_SUPPORTED_ERROR,
        ),
      );
    });
  });

  describe('prepareWithdrawal', () => {
    it('should throw error', async () => {
      expect(passportImxProvider.prepareWithdrawal).toThrow(
        new PassportError(
          'Operation not supported',
          PassportErrorType.OPERATION_NOT_SUPPORTED_ERROR,
        ),
      );
    });
  });

  describe('completeWithdrawal', () => {
    it('should throw error', async () => {
      expect(passportImxProvider.completeWithdrawal).toThrow(
        new PassportError(
          'Operation not supported',
          PassportErrorType.OPERATION_NOT_SUPPORTED_ERROR,
        ),
      );
    });
  });

  describe('getAddress', () => {
    it('should return user ether key address', async () => {
      const response = await passportImxProvider.getAddress();
      expect(response).toEqual(mockUserImx.imx.ethAddress);
    });
  });
});