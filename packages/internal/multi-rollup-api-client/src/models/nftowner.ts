/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * Immutable Multi Rollup API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { Chain } from './chain';

/**
 * 
 * @export
 * @interface NFTOwner
 */
export interface NFTOwner {
    /**
     * 
     * @type {Chain}
     * @memberof NFTOwner
     */
    'chain': Chain;
    /**
     * The address of NFT contract
     * @type {string}
     * @memberof NFTOwner
     */
    'contract_address': string;
    /**
     * An `uint256` token id as string
     * @type {string}
     * @memberof NFTOwner
     */
    'token_id': string;
    /**
     * The account address of the owner of the NFT
     * @type {string}
     * @memberof NFTOwner
     */
    'account_address': string;
    /**
     * The quantity of owned tokens (uint256 as string)
     * @type {string}
     * @memberof NFTOwner
     */
    'quantity': string;
}
