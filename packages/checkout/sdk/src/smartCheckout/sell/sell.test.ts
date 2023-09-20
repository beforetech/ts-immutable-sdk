import { Web3Provider } from '@ethersproject/providers';
import { Environment } from '@imtbl/config';
import { ActionType, SignablePurpose, constants } from '@imtbl/orderbook';
import { BigNumber, TypedDataDomain } from 'ethers';
import { getBuyToken, getERC721Requirement, sell } from './sell';
import { CheckoutConfiguration } from '../../config';
import { GasTokenType, ItemType, TransactionOrGasType } from '../../types';
import { smartCheckout } from '../smartCheckout';
import { createOrderbookInstance } from '../../instance';
import { BuyToken, SellStatusType } from '../../types/sell';
import { CheckoutErrorType } from '../../errors';
import {
  getUnsignedMessage, getUnsignedTransactions, signApprovalTransactions, signMessage,
} from '../actions';
import { SignTransactionStatusType } from '../actions/types';

jest.mock('../../instance');
jest.mock('../smartCheckout');
jest.mock('../actions');

describe('sell', () => {
  const seaportContractAddress = '0xSEAPORT';
  let config: CheckoutConfiguration;
  let mockProvider: Web3Provider;

  beforeEach(() => {
    mockProvider = {
      getSigner: jest.fn().mockReturnValue({
        getAddress: jest.fn().mockResolvedValue('0xADDRESS'),
      }),
    } as unknown as Web3Provider;

    config = new CheckoutConfiguration({
      baseConfig: { environment: Environment.SANDBOX },
    });
  });

  describe('sell', () => {
    it('should call smart checkout and execute the transactions', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721ItemRequirement = {
        type: ItemType.ERC721,
        id,
        contractAddress,
        spenderAddress: seaportContractAddress,
      };

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({
        result: {
          id: '1234',
        },
      });
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockResolvedValue({
        type: SignTransactionStatusType.SUCCESS,
      });

      const result = await sell(
        config,
        mockProvider,
        id,
        contractAddress,
        {
          type: ItemType.NATIVE,
          amount: BigNumber.from(1),
        },
      );

      expect(result).toEqual({
        id,
        collectionAddress: contractAddress,
        smartCheckoutResult: {
          sufficient: true,
          transactionRequirements: [erc721TransactionRequirement],
        },
        status: {
          type: SellStatusType.SUCCESS,
          orderId: '1234',
        },
      });

      expect(smartCheckout).toBeCalledWith(
        config,
        mockProvider,
        [erc721ItemRequirement],
        {
          type: TransactionOrGasType.GAS,
          gasToken: {
            type: GasTokenType.NATIVE,
            limit: BigNumber.from(constants.estimatedFulfillmentGasGwei),
          },
        },
      );
      expect(signMessage).toBeCalledWith(
        mockProvider,
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      expect(signApprovalTransactions).toBeCalledWith(
        mockProvider,
        [{ from: '0xAPPROVAL' }],
      );
      expect(mockCreateListing).toBeCalledWith(
        {
          orderComponents: {},
          orderHash: 'hash',
          orderSignature: '0xSIGNED',
        },
      );
    });

    it('should call smart checkout and not execute transactions when sufficient false', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721ItemRequirement = {
        type: ItemType.ERC721,
        id,
        contractAddress,
        spenderAddress: seaportContractAddress,
      };

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: false,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(0),
          formattedBalance: '0',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(1),
          formattedBalance: '1',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: false,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockResolvedValue({});

      const result = await sell(
        config,
        mockProvider,
        id,
        contractAddress,
        {
          type: ItemType.NATIVE,
          amount: BigNumber.from(1),
        },
      );

      expect(result).toEqual({
        id,
        collectionAddress: contractAddress,
        smartCheckoutResult: {
          sufficient: false,
          transactionRequirements: [erc721TransactionRequirement],
        },
      });

      expect(smartCheckout).toBeCalledWith(
        config,
        mockProvider,
        [erc721ItemRequirement],
        {
          type: TransactionOrGasType.GAS,
          gasToken: {
            type: GasTokenType.NATIVE,
            limit: BigNumber.from(constants.estimatedFulfillmentGasGwei),
          },
        },
      );
      expect(signMessage).toBeCalledTimes(0);
      expect(signApprovalTransactions).toBeCalledTimes(0);
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should return failed if approval transaction reverts', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721ItemRequirement = {
        type: ItemType.ERC721,
        id,
        contractAddress,
        spenderAddress: seaportContractAddress,
      };

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockResolvedValue({
        type: SignTransactionStatusType.FAILED,
        transactionHash: '0xHASH',
        reason: 'Approval transaction failed and was reverted',
      });

      const result = await sell(
        config,
        mockProvider,
        id,
        contractAddress,
        {
          type: ItemType.NATIVE,
          amount: BigNumber.from(1),
        },
      );

      expect(result).toEqual({
        id,
        collectionAddress: contractAddress,
        smartCheckoutResult: {
          sufficient: true,
          transactionRequirements: [erc721TransactionRequirement],
        },
        status: {
          type: SellStatusType.FAILED,
          transactionHash: '0xHASH',
          reason: 'Approval transaction failed and was reverted',
        },
      });

      expect(smartCheckout).toBeCalledWith(
        config,
        mockProvider,
        [erc721ItemRequirement],
        {
          type: TransactionOrGasType.GAS,
          gasToken: {
            type: GasTokenType.NATIVE,
            limit: BigNumber.from(constants.estimatedFulfillmentGasGwei),
          },
        },
      );
      expect(signMessage).toBeCalledWith(
        mockProvider,
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      expect(signApprovalTransactions).toBeCalledWith(
        mockProvider,
        [{ from: '0xAPPROVAL' }],
      );
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should throw error if prepare listing fails', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockRejectedValue(new Error('error from orderbook')),
      });

      let message;
      let type;
      let data;

      try {
        await sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        );
      } catch (err: any) {
        message = err.message;
        type = err.type;
        data = err.data;
      }

      expect(message).toEqual('An error occurred while preparing the listing');
      expect(type).toEqual(CheckoutErrorType.PREPARE_ORDER_LISTING_ERROR);
      expect(data).toEqual({
        message: 'error from orderbook',
        id,
        collectionAddress: contractAddress,
      });

      expect(smartCheckout).toBeCalledTimes(0);
    });

    it('should throw error if getSigner call errors', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockReturnValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
      });

      const rejectedProvider = {
        getSigner: jest.fn().mockReturnValue({
          getAddress: jest.fn().mockRejectedValue(new Error('error from provider')),
        }),
      } as unknown as Web3Provider;

      let message;
      let type;
      let data;

      try {
        await sell(
          config,
          rejectedProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        );
      } catch (err: any) {
        message = err.message;
        type = err.type;
        data = err.data;
      }

      expect(message).toEqual('An error occurred while preparing the listing');
      expect(type).toEqual(CheckoutErrorType.PREPARE_ORDER_LISTING_ERROR);
      expect(data).toEqual({
        message: 'error from provider',
        id,
        collectionAddress: contractAddress,
      });

      expect(smartCheckout).toBeCalledTimes(0);
    });

    it('should throw error if sign message fails', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockRejectedValue(new Error('error from sign message'));
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockResolvedValue({});

      await expect(
        sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        ),
      ).rejects.toThrowError('error from sign message');

      expect(smartCheckout).toBeCalledTimes(1);
      expect(signMessage).toBeCalledTimes(1);
      expect(signApprovalTransactions).toBeCalledTimes(0);
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should throw error if getUnsignedTransactions errors', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockRejectedValue(new Error('error from get unsigned transactions'));
      (signApprovalTransactions as jest.Mock).mockResolvedValue({});

      await expect(
        sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        ),
      ).rejects.toThrowError('error from get unsigned transactions');

      expect(smartCheckout).toBeCalledTimes(1);
      expect(signMessage).toBeCalledTimes(1);
      expect(getUnsignedTransactions).toBeCalledTimes(1);
      expect(signApprovalTransactions).toBeCalledTimes(0);
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should throw error if signApprovalTransactions errors', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockRejectedValue(new Error('error from sign approval transactions'));

      await expect(
        sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        ),
      ).rejects.toThrowError('error from sign approval transactions');

      expect(smartCheckout).toBeCalledTimes(1);
      expect(signMessage).toBeCalledTimes(1);
      expect(signApprovalTransactions).toBeCalledTimes(1);
      expect(getUnsignedTransactions).toBeCalledTimes(1);
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should throw error if no message to sign', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockResolvedValue({});
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(undefined);
      (signMessage as jest.Mock).mockResolvedValue({});
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({});
      (signApprovalTransactions as jest.Mock).mockResolvedValue({});

      let message;
      let type;
      let data;

      try {
        await sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        );
      } catch (err: any) {
        message = err.message;
        type = err.type;
        data = err.data;
      }

      expect(message).toEqual('The unsigned message is missing after preparing the listing');
      expect(type).toEqual(CheckoutErrorType.SIGN_MESSAGE_ERROR);
      expect(data).toEqual({
        id,
        collectionAddress: contractAddress,
      });

      expect(smartCheckout).toBeCalledTimes(1);
      expect(signMessage).toBeCalledTimes(0);
      expect(signApprovalTransactions).toBeCalledTimes(0);
      expect(mockCreateListing).toBeCalledTimes(0);
    });

    it('should throw error if create listing errors', async () => {
      const id = '0';
      const contractAddress = '0xERC721';

      const erc721TransactionRequirement = {
        type: ItemType.ERC721,
        sufficient: true,
        required: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        current: {
          type: ItemType.ERC721,
          balance: BigNumber.from(1),
          formattedBalance: '1',
          contractAddress: '0xab8bb5bc4FB1Cfc060f77f87B558c98abDa65130',
          id: '0',
        },
        delta: {
          balance: BigNumber.from(0),
          formattedBalance: '0',
        },
      };

      (smartCheckout as jest.Mock).mockResolvedValue({
        sufficient: true,
        transactionRequirements: [
          erc721TransactionRequirement,
        ],
      });
      const mockCreateListing = jest.fn().mockRejectedValue(new Error('error from create listing'));
      (createOrderbookInstance as jest.Mock).mockResolvedValue({
        config: jest.fn().mockReturnValue({
          seaportContractAddress,
        }),
        prepareListing: jest.fn().mockResolvedValue({
          actions: [
            {
              type: ActionType.SIGNABLE,
              purpose: SignablePurpose.CREATE_LISTING,
              message: {
                domain: '',
                types: '',
                value: '',
              },
            },
          ],
        }),
        createListing: mockCreateListing,
      });
      (getUnsignedMessage as jest.Mock).mockReturnValue(
        {
          orderHash: 'hash',
          orderComponents: {},
          unsignedMessage: {
            domain: {} as TypedDataDomain,
            types: { types: [] },
            value: { values: '' },
          },
        },
      );
      (signMessage as jest.Mock).mockResolvedValue({
        orderHash: 'hash',
        orderComponents: {},
        signedMessage: '0xSIGNED',
      });
      (getUnsignedTransactions as jest.Mock).mockResolvedValue({
        approvalTransactions: [{ from: '0xAPPROVAL' }],
      });
      (signApprovalTransactions as jest.Mock).mockResolvedValue({});

      let message;
      let type;
      let data;

      try {
        await sell(
          config,
          mockProvider,
          id,
          contractAddress,
          {
            type: ItemType.NATIVE,
            amount: BigNumber.from(1),
          },
        );
      } catch (err: any) {
        message = err.message;
        type = err.type;
        data = err.data;
      }

      expect(message).toEqual('An error occurred while creating the listing');
      expect(type).toEqual(CheckoutErrorType.CREATE_ORDER_LISTING_ERROR);
      expect(data).toEqual({
        message: 'error from create listing',
        id,
        collectionAddress: contractAddress,
      });

      expect(smartCheckout).toBeCalledTimes(1);
      expect(signMessage).toBeCalledTimes(1);
      expect(signApprovalTransactions).toBeCalledTimes(1);
      expect(mockCreateListing).toBeCalledTimes(1);
    });
  });

  describe('getBuyToken', () => {
    it('should return a native buy token', () => {
      const buyToken: BuyToken = {
        type: ItemType.NATIVE,
        amount: BigNumber.from(1),
      };

      const result = getBuyToken(buyToken);

      expect(result).toEqual({
        type: ItemType.NATIVE,
        amount: '1',
      });
    });

    it('should return an ERC20 buy token', () => {
      const buyToken: BuyToken = {
        type: ItemType.ERC20,
        amount: BigNumber.from(1),
        contractAddress: '0xERC20',
      };

      const result = getBuyToken(buyToken);

      expect(result).toEqual({
        type: ItemType.ERC20,
        amount: '1',
        contractAddress: '0xERC20',
      });
    });
  });

  describe('getERC721Requirement', () => {
    it('should return an ERC721 item requirement', () => {
      const id = '0';
      const contractAddress = '0xERC721';
      const spenderAddress = '0xSEAPORT';

      const result = getERC721Requirement(id, contractAddress, spenderAddress);

      expect(result).toEqual({
        type: ItemType.ERC721,
        id,
        contractAddress,
        spenderAddress,
      });
    });
  });
});