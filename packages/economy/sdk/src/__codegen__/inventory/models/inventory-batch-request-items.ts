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


// May contain unused imports in some cases
// @ts-ignore
import { InventoryCreateItemRequest } from './inventory-create-item-request';
// May contain unused imports in some cases
// @ts-ignore
import { InventoryDeleteItemRequest } from './inventory-delete-item-request';
// May contain unused imports in some cases
// @ts-ignore
import { InventoryLockItemRequest } from './inventory-lock-item-request';

/**
 * 
 * @export
 * @interface InventoryBatchRequestItems
 */
export interface InventoryBatchRequestItems {
    /**
     * 
     * @type {Array<InventoryCreateItemRequest>}
     * @memberof InventoryBatchRequestItems
     */
    'create'?: Array<InventoryCreateItemRequest>;
    /**
     * 
     * @type {Array<InventoryDeleteItemRequest>}
     * @memberof InventoryBatchRequestItems
     */
    'delete'?: Array<InventoryDeleteItemRequest>;
    /**
     * 
     * @type {Array<InventoryLockItemRequest>}
     * @memberof InventoryBatchRequestItems
     */
    'lock'?: Array<InventoryLockItemRequest>;
    /**
     * 
     * @type {Array<InventoryLockItemRequest>}
     * @memberof InventoryBatchRequestItems
     */
    'on_chain_lock'?: Array<InventoryLockItemRequest>;
}
