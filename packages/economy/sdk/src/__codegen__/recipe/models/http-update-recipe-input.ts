/* tslint:disable */
/* eslint-disable */
/**
 * Recipe API
 * Recipe API
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
import { HttpCondition } from './http-condition';

/**
 * 
 * @export
 * @interface HttpUpdateRecipeInput
 */
export interface HttpUpdateRecipeInput {
    /**
     * 
     * @type {Array<HttpCondition>}
     * @memberof HttpUpdateRecipeInput
     */
    'conditions': Array<HttpCondition>;
    /**
     * 
     * @type {string}
     * @memberof HttpUpdateRecipeInput
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof HttpUpdateRecipeInput
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof HttpUpdateRecipeInput
     */
    'type'?: HttpUpdateRecipeInputTypeEnum;
}

export const HttpUpdateRecipeInputTypeEnum = {
    SingleItem: 'single_item',
    MultipleItem: 'multiple_item',
    SingleCurrency: 'single_currency',
    MultipleCurrency: 'multiple_currency'
} as const;

export type HttpUpdateRecipeInputTypeEnum = typeof HttpUpdateRecipeInputTypeEnum[keyof typeof HttpUpdateRecipeInputTypeEnum];

