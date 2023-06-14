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
import { SaleFee } from './sale-fee';
// May contain unused imports in some cases
// @ts-ignore
import { SalePaymentToken } from './sale-payment-token';

/**
 * 
 * @export
 * @interface SalePayment
 */
export interface SalePayment {
    /**
     * 
     * @type {SalePaymentToken}
     * @memberof SalePayment
     */
    'token': SalePaymentToken;
    /**
     * The base price of the sale not including any fees
     * @type {string}
     * @memberof SalePayment
     */
    'price_excluding_fees': string;
    /**
     * The total price of the sale. Includes the sum of all fees
     * @type {string}
     * @memberof SalePayment
     */
    'price_including_fees': string;
    /**
     * The fees associated with this sale
     * @type {Array<SaleFee>}
     * @memberof SalePayment
     */
    'fees': Array<SaleFee>;
}
