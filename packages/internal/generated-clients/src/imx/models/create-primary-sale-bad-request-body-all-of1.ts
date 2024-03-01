/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * Immutable X API
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface CreatePrimarySaleBadRequestBodyAllOf1
 */
export interface CreatePrimarySaleBadRequestBodyAllOf1 {
    /**
     * Error Code
     * @type {string}
     * @memberof CreatePrimarySaleBadRequestBodyAllOf1
     */
    'code': CreatePrimarySaleBadRequestBodyAllOf1CodeEnum;
    /**
     * Additional details to help resolve the error
     * @type {object}
     * @memberof CreatePrimarySaleBadRequestBodyAllOf1
     */
    'details': object | null;
}

export const CreatePrimarySaleBadRequestBodyAllOf1CodeEnum = {
    ValidationError: 'VALIDATION_ERROR'
} as const;

export type CreatePrimarySaleBadRequestBodyAllOf1CodeEnum = typeof CreatePrimarySaleBadRequestBodyAllOf1CodeEnum[keyof typeof CreatePrimarySaleBadRequestBodyAllOf1CodeEnum];

