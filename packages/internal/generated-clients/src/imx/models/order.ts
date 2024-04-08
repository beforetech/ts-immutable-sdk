/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * Immutable X API
 *
 * The version of the OpenAPI document: 3.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { OrderBuy } from './order-buy';
// May contain unused imports in some cases
// @ts-ignore
import { OrderFeeInfo } from './order-fee-info';
// May contain unused imports in some cases
// @ts-ignore
import { OrderSell } from './order-sell';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * Amount of the asset already sold by this order
     * @type {string}
     * @memberof Order
     */
    'amount_sold': string | null;
    /**
     * 
     * @type {OrderBuy}
     * @memberof Order
     */
    'buy': OrderBuy;
    /**
     * Expiration timestamp of this order
     * @type {string}
     * @memberof Order
     */
    'expiration_timestamp': string | null;
    /**
     * Fee information for the order
     * @type {Array<OrderFeeInfo>}
     * @memberof Order
     */
    'fees'?: Array<OrderFeeInfo>;
    /**
     * ID of the order
     * @type {number}
     * @memberof Order
     */
    'order_id': number;
    /**
     * 
     * @type {OrderSell}
     * @memberof Order
     */
    'sell': OrderSell;
    /**
     * Status of the order
     * @type {string}
     * @memberof Order
     */
    'status': string;
    /**
     * Timestamp this order was created
     * @type {string}
     * @memberof Order
     */
    'timestamp': string | null;
    /**
     * Updated timestamp of this order
     * @type {string}
     * @memberof Order
     */
    'updated_timestamp': string | null;
    /**
     * Ethereum address of the user who submitted the order
     * @type {string}
     * @memberof Order
     */
    'user': string;
}

