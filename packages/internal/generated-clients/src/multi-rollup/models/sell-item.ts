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



/**
 * 
 * @export
 * @interface SellItem
 */
export interface SellItem {
    /**
     * Token type user is offering which in this case is a ERC721
     * @type {string}
     * @memberof SellItem
     */
    'item_type': SellItemItemTypeEnum;
    /**
     * Address of ERC721 token
     * @type {string}
     * @memberof SellItem
     */
    'contract_address': string;
    /**
     * ID of ERC721 token
     * @type {string}
     * @memberof SellItem
     */
    'token_id': string;
}

export const SellItemItemTypeEnum = {
    Erc721: 'ERC721'
} as const;

export type SellItemItemTypeEnum = typeof SellItemItemTypeEnum[keyof typeof SellItemItemTypeEnum];

