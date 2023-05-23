/* tslint:disable */
/* eslint-disable */
/**
 * Inventory API
 * Inventory API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface InventoryUpdateItemRequest
 */
export interface InventoryUpdateItemRequest {
    /**
     * JSON Object of item properties e.g. {\"Level\": 2, \"Rarity\": \"Common\"}
     * @type {object}
     * @memberof InventoryUpdateItemRequest
     */
    'metadata'?: object;
    /**
     * Overwrite means the metadata will overwrite the existing metadata entirely.
     * @type {boolean}
     * @memberof InventoryUpdateItemRequest
     */
    'overwrite'?: boolean;
}
