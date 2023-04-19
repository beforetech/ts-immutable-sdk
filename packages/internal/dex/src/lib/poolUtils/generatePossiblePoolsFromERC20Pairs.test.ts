import { describe, it } from '@jest/globals';
import { Token } from '@uniswap/sdk-core';
import { ERC20Pair } from './generateERC20Pairs';
import { generatePossiblePoolsFromERC20Pair } from './generatePossiblePoolsFromERC20Pairs';
import {
  IMX_TEST_CHAIN,
  USDC_TEST_CHAIN,
  WETH_TEST_CHAIN,
} from '../../utils/testUtils';

describe('generatePoolsFromTokenPairs', () => {
  describe('when given one TokenPair and one CommonRoutingTokens', () => {
    it('should return one combination', () => {
      const erc20Pair: ERC20Pair = [IMX_TEST_CHAIN, USDC_TEST_CHAIN];
      const commonRoutingERC20s: Token[] = [];

      const pools = generatePossiblePoolsFromERC20Pair(
        erc20Pair,
        commonRoutingERC20s
      );
      expect(pools).toMatchInlineSnapshot(`
        [
          {
            "erc20Pair": [
              Token {
                "address": "0x72958b06abdF2701AcE6ceb3cE0B8B1CE11E0851",
                "chainId": 999,
                "decimals": 18,
                "isNative": false,
                "isToken": true,
                "name": "Immutable X",
                "symbol": "IMX",
              },
              Token {
                "address": "0x93733225CCc07Ba02b1449aA3379418Ddc37F6EC",
                "chainId": 999,
                "decimals": 6,
                "isNative": false,
                "isToken": true,
                "name": "USD Coin",
                "symbol": "USDC",
              },
            ],
            "fee": 100,
            "poolAddress": "0xd837B5E6DF4B1B8F90dfc3714AEB7031FAdFD862",
          },
          {
            "erc20Pair": [
              Token {
                "address": "0x72958b06abdF2701AcE6ceb3cE0B8B1CE11E0851",
                "chainId": 999,
                "decimals": 18,
                "isNative": false,
                "isToken": true,
                "name": "Immutable X",
                "symbol": "IMX",
              },
              Token {
                "address": "0x93733225CCc07Ba02b1449aA3379418Ddc37F6EC",
                "chainId": 999,
                "decimals": 6,
                "isNative": false,
                "isToken": true,
                "name": "USD Coin",
                "symbol": "USDC",
              },
            ],
            "fee": 500,
            "poolAddress": "0x3113b4cCC489d4835AE7F3C205B5a16ee9e7A508",
          },
          {
            "erc20Pair": [
              Token {
                "address": "0x72958b06abdF2701AcE6ceb3cE0B8B1CE11E0851",
                "chainId": 999,
                "decimals": 18,
                "isNative": false,
                "isToken": true,
                "name": "Immutable X",
                "symbol": "IMX",
              },
              Token {
                "address": "0x93733225CCc07Ba02b1449aA3379418Ddc37F6EC",
                "chainId": 999,
                "decimals": 6,
                "isNative": false,
                "isToken": true,
                "name": "USD Coin",
                "symbol": "USDC",
              },
            ],
            "fee": 3000,
            "poolAddress": "0xE6d2548B8d02BDa027Dbc95398B3b49b26979e4f",
          },
          {
            "erc20Pair": [
              Token {
                "address": "0x72958b06abdF2701AcE6ceb3cE0B8B1CE11E0851",
                "chainId": 999,
                "decimals": 18,
                "isNative": false,
                "isToken": true,
                "name": "Immutable X",
                "symbol": "IMX",
              },
              Token {
                "address": "0x93733225CCc07Ba02b1449aA3379418Ddc37F6EC",
                "chainId": 999,
                "decimals": 6,
                "isNative": false,
                "isToken": true,
                "name": "USD Coin",
                "symbol": "USDC",
              },
            ],
            "fee": 10000,
            "poolAddress": "0xF48b3847f3b084983AcB822ba34cd50728E687Dc",
          },
        ]
      `);
    });
  });

  describe('when given one TokenPair and four fees', () => {
    it('should return twelve combinations', () => {
      const erc20Pair: ERC20Pair = [IMX_TEST_CHAIN, USDC_TEST_CHAIN];
      const commonRoutingERC20s: Token[] = [WETH_TEST_CHAIN];

      const pools = generatePossiblePoolsFromERC20Pair(
        erc20Pair,
        commonRoutingERC20s
      );

      expect(pools).toHaveLength(12);
    });
  });
});