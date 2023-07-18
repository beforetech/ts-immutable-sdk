import { JsonRpcProvider } from '@ethersproject/providers';
import { ZkEvmProviderInput, ZkEvmProvider } from './zkEvmProvider';
import { registerZkEvmUser } from './userRegistration';

jest.mock('@ethersproject/providers');
jest.mock('./relayerAdapter');
jest.mock('./userRegistration');

describe('ZkEvmProvider', () => {
  const getProvider = () => {
    const constructorParameters = {
      config: {},
    } as Partial<ZkEvmProviderInput>;

    return new ZkEvmProvider(constructorParameters as ZkEvmProviderInput);
  };

  describe('passthrough methods', () => {
    const sendMock = jest.fn();
    const passthroughMethods: Array<[string, any]> = [
      ['eth_getStorageAt', '0x'],
      ['eth_getBalance', '0x1'],
      ['eth_gasPrice', '0x2'],
      ['eth_estimateGas', '0x3'],
      ['eth_call', '0x'],
      ['eth_blockNumber', '0x4'],
      ['eth_chainId', '0x5'],
      ['eth_getBlockByHash', {
        baseFeePerGas: '0x7',
        difficulty: '0x0',
        extraData: '0x496c6c756d696e61746520446d6f63726174697a6520447374726962757465',
        gasLimit: '0x1c9c380',
        gasUsed: '0x8c6cee',
        hash: '0xec484a535316996705454b53ce5a1f4af0f64e399c2855ec05753df2d0e1a83b',
        logsBloom: '0x00000244841000100041010000100000011148010108100000000008000002100040010020840000010000010008000000801820002c00612094290801200800100c20000c0202080080000804000002000009c0020110002c0200020000002004000800064000000a9400060000090042045400200000101440201000018102501082040000800020100000008580042100040001101000000ca4020002000202088c09000000201004188100080000200091400000000080c0500c0025402004400002080100000000442080200044000001000000000150000d020100a0000014002000420100000840000400202080040000000000028024800000400008',
        miner: '0x1e2cd78882b12d3954a049fd82ffd691565dc0a5',
        mixHash: '0x6e864fb8be5c362d52a206823a6bf64d0310e97f2f8904e51d8419d569349f6c',
        nonce: '0x0000000000000000',
        number: '0x3a33ad',
        parentHash: '0xdb557161e52f5becee1483e3bbd5714baca9a940a11433d101546ac77977beff',
        receiptsRoot: '0x79c1493bb19bf5454d6ccff5c277df7f8c045702099a5a5a84a8d11eaa919fb3',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        size: '0xc0cd',
        stateRoot: '0x8125b0d797b82408652a90255e7f7059314552a00b9587890e39cc3fed83f7f3',
        timestamp: '0x64a258e8',
        totalDifficulty: '0x3c656d23029ab0',
        transactions: [
          '0x415a3c9e9dceb2974b74ddd739097f838e200e103370f688314a5f01c15e769c',
        ],
        transactionsRoot: '0xa87c27d6395631c8c779f9070b319268740355579f3b11d9454c2834b5943951',
        uncles: [],
        withdrawals: [
          {
            index: '0xc8f201',
            validatorIndex: '0x3a6',
            address: '0xe276bc378a527a8792b353cdca5b5e53263dfb9e',
            amount: '0xf00',
          },
        ],
        withdrawalsRoot: '0x9b35c0a8f97d4a06af667bd48ae1e7ca405218326ec384c443b6cb7960f88d5d',
      }],
      ['eth_getBlockByNumber', {
        baseFeePerGas: '0x7',
        difficulty: '0x0',
        extraData: '0x496c6c756d696e61746520446d6f63726174697a6520447374726962757465',
        gasLimit: '0x1c9c380',
        gasUsed: '0x8c6cee',
        hash: '0xec484a535316996705454b53ce5a1f4af0f64e399c2855ec05753df2d0e1a83b',
        logsBloom: '0x00000244841000100041010000100000011148010108100000000008000002100040010020840000010000010008000000801820002c00612094290801200800100c20000c0202080080000804000002000009c0020110002c0200020000002004000800064000000a9400060000090042045400200000101440201000018102501082040000800020100000008580042100040001101000000ca4020002000202088c09000000201004188100080000200091400000000080c0500c0025402004400002080100000000442080200044000001000000000150000d020100a0000014002000420100000840000400202080040000000000028024800000400008',
        miner: '0x1e2cd78882b12d3954a049fd82ffd691565dc0a5',
        mixHash: '0x6e864fb8be5c362d52a206823a6bf64d0310e97f2f8904e51d8419d569349f6c',
        nonce: '0x0000000000000000',
        number: '0x3a33ad',
        parentHash: '0xdb557161e52f5becee1483e3bbd5714baca9a940a11433d101546ac77977beff',
        receiptsRoot: '0x79c1493bb19bf5454d6ccff5c277df7f8c045702099a5a5a84a8d11eaa919fb3',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        size: '0xc0cd',
        stateRoot: '0x8125b0d797b82408652a90255e7f7059314552a00b9587890e39cc3fed83f7f3',
        timestamp: '0x64a258e8',
        totalDifficulty: '0x3c656d23029ab0',
        transactions: [
          '0x415a3c9e9dceb2974b74ddd739097f838e200e103370f688314a5f01c15e769c',
        ],
        transactionsRoot: '0xa87c27d6395631c8c779f9070b319268740355579f3b11d9454c2834b5943951',
        uncles: [],
        withdrawals: [
          {
            index: '0xc8f201',
            validatorIndex: '0x3a6',
            address: '0xe276bc378a527a8792b353cdca5b5e53263dfb9e',
            amount: '0xf00',
          },
        ],
        withdrawalsRoot: '0x9b35c0a8f97d4a06af667bd48ae1e7ca405218326ec384c443b6cb7960f88d5d',
      }],
      ['eth_getTransactionByHash', {
        blockHash: '0xec484a535316996705454b53ce5a1f4af0f64e399c2855ec05753df2d0e1a83b',
        blockNumber: '0x3a33ad',
        from: '0x781ed6f2834d692fd75002c7f2f406c5ed1c6996',
        gas: '0xb513',
        gasPrice: '0x9502f907',
        maxFeePerGas: '0x9502f90e',
        maxPriorityFeePerGas: '0x9502f900',
        hash: '0x415a3c9e9dceb2974b74ddd739097f838e200e103370f688314a5f01c15e769c',
        input: '0x095ea7b3000000000000000000000000a81373e6070bc2d9d25216dbe52a979c850e261f000000000000000000000000000000000000000000000005f40bfa403363a8a3',
        nonce: '0x28',
        to: '0x922a99b817f501af4c3dfc1ce359d7ec9dbdf8a3',
        transactionIndex: '0x0',
        value: '0x0',
        type: '0x2',
        accessList: [],
        chainId: '0xaa36a7',
        v: '0x0',
        r: '0xdd4c1526e293d8139500d84104cd28498d3570603c9f0698e47e7406a552b388',
        s: '0x1a3f1c65aa1ea66ef595422f7dd4c43a4800156225f02ffc22272093e41b780',
      }],
      ['eth_getTransactionReceipt', {
        blockHash: '0xec484a535316996705454b53ce5a1f4af0f64e399c2855ec05753df2d0e1a83b',
        blockNumber: '0x3a33ad',
        contractAddress: null,
        cumulativeGasUsed: '0xb513',
        effectiveGasPrice: '0x9502f907',
        from: '0x781ed6f2834d692fd75002c7f2f406c5ed1c6996',
        gasUsed: '0xb513',
        logs: [
          {
            address: '0x922a99b817f501af4c3dfc1ce359d7ec9dbdf8a3',
            topics: [
              '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
              '0x000000000000000000000000781ed6f2834d692fd75002c7f2f406c5ed1c6996',
              '0x000000000000000000000000a81373e6070bc2d9d25216dbe52a979c850e261f',
            ],
            data: '0x000000000000000000000000000000000000000000000005f40bfa403363a8a3',
            blockNumber: '0x3a33ad',
            transactionHash: '0x415a3c9e9dceb2974b74ddd739097f838e200e103370f688314a5f01c15e769c',
            transactionIndex: '0x0',
            blockHash: '0xec484a535316996705454b53ce5a1f4af0f64e399c2855ec05753df2d0e1a83b',
            logIndex: '0x0',
            removed: false,
          },
        ],
        logsBloom: '0x00000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000400080000000200800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000010000000000000000000000080000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000',
        status: '0x1',
        to: '0x922a99b817f501af4c3dfc1ce359d7ec9dbdf8a3',
        transactionHash: '0x415a3c9e9dceb2974b74ddd739097f838e200e103370f688314a5f01c15e769c',
        transactionIndex: '0x0',
        type: '0x2',
      }],
      ['eth_getTransactionCount', '0x6'],
    ];

    beforeEach(() => {
      jest.resetAllMocks();

      (JsonRpcProvider as unknown as jest.Mock).mockImplementation(() => ({
        send: sendMock,
      }));
    });

    it.each(passthroughMethods)('should passthrough %s to the jsonRpcProvider', async (method, returnValue) => {
      sendMock.mockResolvedValueOnce(returnValue);

      const provider = getProvider();

      // NOTE: params are static since we are only testing the call is
      // forwarded with whatever parameters it's called with. Might not match
      // the actual parameters for a specific method.
      const providerParams = { method, params: [] };
      const result = await provider.request(providerParams);

      expect(sendMock).toBeCalledTimes(1);
      expect(sendMock).toBeCalledWith(providerParams.method, providerParams.params);
      expect(result).toBe(returnValue);
    });
  });

  describe('eth_requestAccounts', () => {
    it('should return the ethAddress if already logged in', async () => {
      const mockUser = {
        zkEvm: {
          ethAddress: '0x123',
        },
      };
      const mockMagicProvider = {};
      (registerZkEvmUser as jest.Mock).mockResolvedValue({
        user: mockUser,
        magicProvider: mockMagicProvider,
      });
      const provider = getProvider();

      const resultOne = await provider.request({ method: 'eth_requestAccounts', params: [] });
      const resultTwo = await provider.request({ method: 'eth_requestAccounts', params: [] });

      expect(resultOne).toEqual([mockUser.zkEvm.ethAddress]);
      expect(resultTwo).toEqual([mockUser.zkEvm.ethAddress]);
      expect(registerZkEvmUser).toBeCalledTimes(1);
    });
  });
});