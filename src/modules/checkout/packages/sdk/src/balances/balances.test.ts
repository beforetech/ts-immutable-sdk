import { getBalance } from './balances';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { ERC20ABI } from '../types';
import { CheckoutError, CheckoutErrorType } from '../errors';

jest.mock('ethers', () => {
  return {
    ...jest.requireActual('ethers'),
    Contract: jest.fn()
  }
});

describe('balances', () => {
  const currentBalance = BigNumber.from('1000000000000000000');
  const formattedBalance = '1.0';
  const mockGetBalance = jest
    .fn()
    .mockResolvedValue(currentBalance);
    const mockGetNetwork = jest
    .fn()
    .mockResolvedValue({chainID: '0x1', name: 'homestead'});
  const mockProvider = jest.fn().mockImplementation(() => {
    return {
      getBalance: mockGetBalance,
      getNetwork: mockGetNetwork
    } as unknown as Web3Provider;
  });

  describe('getBalance()', () => {
    it('should call getBalance() on provider and return the balance', async () => {
      const balanceResult = await getBalance(
        mockProvider() as unknown as Web3Provider,
        '0xAddress'
      );
      expect(mockGetBalance).toBeCalledTimes(1);
      expect(balanceResult.balance).toEqual(currentBalance);
    });

    it('should catch an error from getBalance() and throw a CheckoutError of type BalanceError', async () => {
      const mockProvider = jest.fn().mockImplementation(() => {
        return {
          getBalance: jest.fn().mockRejectedValue(new Error('Error getting balance')),
          getNetwork: mockGetNetwork
        }
      });

      await expect(getBalance(mockProvider(), '0xAddress')).rejects.toThrow(new CheckoutError('Error getting balance', CheckoutErrorType.GET_BALANCE_ERROR));
    });
  });

  describe('getBalance() with contract address', () => {
    let balanceOfMock: jest.Mock;
    let decimalsMock: jest.Mock;
    let nameMock: jest.Mock;
    let symbolMock: jest.Mock;

    beforeEach(() => {
      jest.restoreAllMocks();

      balanceOfMock = jest.fn().mockResolvedValue(currentBalance);
      decimalsMock = jest.fn().mockResolvedValue(18);
      nameMock = jest.fn().mockResolvedValue('Ethereum');
      symbolMock = jest.fn().mockResolvedValue('ETH');
      (Contract as unknown as jest.Mock).mockReturnValue({
        balanceOf: balanceOfMock,
        decimals: decimalsMock,
        name: nameMock,
        symbol: symbolMock,
        });
    });

    it('should call balanceOf on the appropriate contract and return the balance', async () => {
      const testContractAddress = '0x10c';
      const balanceResult = await getBalance(
        mockProvider(),
          'abc123',
          testContractAddress
      );

      expect(balanceOfMock).toBeCalledTimes(1);
      expect(decimalsMock).toBeCalledTimes(1);
      expect(nameMock).toBeCalledTimes(1);
      expect(symbolMock).toBeCalledTimes(1);
      expect(balanceResult).toEqual({
        balance: currentBalance,
        formattedBalance,
        token: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          address: testContractAddress
        }
        
      })
    });

    it('should throw error if call to the contract fails', async () => {
      (Contract as unknown as jest.Mock).mockReturnValue({
        balanceOf: balanceOfMock,
        decimals: decimalsMock,
        name: jest.fn().mockRejectedValue(new Error('Error getting name from contract')),
        symbol: symbolMock,
      });

      await expect(getBalance(
        mockProvider(),
        'abc123',
        '0x10c'
      )).rejects.toThrow(new CheckoutError('Error getting name from contract', CheckoutErrorType.GET_ERC20_BALANCE_ERROR));
    });

    it('should throw an error if the contract address is invalid', async () => {
      (Contract as unknown as jest.Mock).mockImplementation(
        () => {
          const contract = jest.requireActual('ethers').Contract;
          return new contract(mockProvider(), JSON.stringify(ERC20ABI), null);
        }
      );

      await expect(getBalance(
        mockProvider(),
        'abc123',
        '0x10c'
      )).rejects.toThrow(new CheckoutError('invalid contract address or ENS name (argument="addressOrName", value=undefined, code=INVALID_ARGUMENT, version=contracts/5.7.0)', CheckoutErrorType.GET_ERC20_BALANCE_ERROR));
    })
  });
});
