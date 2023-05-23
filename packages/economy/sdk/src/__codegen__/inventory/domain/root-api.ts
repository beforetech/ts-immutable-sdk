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


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { InventoryBatchRequest } from '../models';
// @ts-ignore
import { InventoryCreateItemRequest } from '../models';
// @ts-ignore
import { InventoryItem } from '../models';
// @ts-ignore
import { InventoryMintItemRequest } from '../models';
// @ts-ignore
import { InventoryPaginatedItems } from '../models';
// @ts-ignore
import { InventoryUpdateItemRequest } from '../models';
/**
 * RootApi - axios parameter creator
 * @export
 */
export const RootApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * An atomic operation that allow to create and delete multiple items
         * @summary Create/Delete items in batch
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryBatchRequest} request Batch request with an array of items to delete and create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDBatchPost: async (gameID: string, request: InventoryBatchRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameID' is not null or undefined
            assertParamExists('gameIDBatchPost', 'gameID', gameID)
            // verify required parameter 'request' is not null or undefined
            assertParamExists('gameIDBatchPost', 'request', request)
            const localVarPath = `/{gameID}/batch`
                .replace(`{${"gameID"}}`, encodeURIComponent(String(gameID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(request, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get items based on filters
         * @summary Get items
         * @param {string} gameID Game ID to filter items
         * @param {Array<string>} [id] Item IDs to filter items
         * @param {Array<string>} [owner] Owners to filter items
         * @param {number} [limit] Number of records per page
         * @param {number} [page] Page number
         * @param {string} [orderBy] field to order the results
         * @param {string} [direction] results ordered ascending or descending
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsGet: async (gameID: string, id?: Array<string>, owner?: Array<string>, limit?: number, page?: number, orderBy?: string, direction?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameID' is not null or undefined
            assertParamExists('gameIDItemsGet', 'gameID', gameID)
            const localVarPath = `/{gameID}/items`
                .replace(`{${"gameID"}}`, encodeURIComponent(String(gameID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id) {
                localVarQueryParameter['id'] = id;
            }

            if (owner) {
                localVarQueryParameter['owner'] = owner;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (orderBy !== undefined) {
                localVarQueryParameter['order_by'] = orderBy;
            }

            if (direction !== undefined) {
                localVarQueryParameter['direction'] = direction;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete an item for the given game
         * @summary Delete an item
         * @param {string} gameID Game ID of the item you are trying to delete
         * @param {string} id Item ID to be deleted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsIdDelete: async (gameID: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameID' is not null or undefined
            assertParamExists('gameIDItemsIdDelete', 'gameID', gameID)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('gameIDItemsIdDelete', 'id', id)
            const localVarPath = `/{gameID}/items/{id}`
                .replace(`{${"gameID"}}`, encodeURIComponent(String(gameID)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Create an item for the given game, owner, location and item definition
         * @summary Create an item
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryCreateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsPost: async (gameID: string, request: InventoryCreateItemRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameID' is not null or undefined
            assertParamExists('gameIDItemsPost', 'gameID', gameID)
            // verify required parameter 'request' is not null or undefined
            assertParamExists('gameIDItemsPost', 'request', request)
            const localVarPath = `/{gameID}/items`
                .replace(`{${"gameID"}}`, encodeURIComponent(String(gameID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(request, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Used to mint items that aren\'t minted yet (pending status)
         * @summary Mint on-chain items in the zkEVM
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryMintItemRequest} request List of item ids to be minted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDMintPost: async (gameID: string, request: InventoryMintItemRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'gameID' is not null or undefined
            assertParamExists('gameIDMintPost', 'gameID', gameID)
            // verify required parameter 'request' is not null or undefined
            assertParamExists('gameIDMintPost', 'request', request)
            const localVarPath = `/{gameID}/mint`
                .replace(`{${"gameID"}}`, encodeURIComponent(String(gameID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(request, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get item by ID
         * @summary Get item by ID
         * @param {string} id Item ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        itemsIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('itemsIdGet', 'id', id)
            const localVarPath = `/items/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update an item\'s metadata
         * @summary Update an item
         * @param {string} itemID Item ID - The identifier of the item you\&#39;re updating
         * @param {InventoryUpdateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        itemsItemIDPut: async (itemID: string, request: InventoryUpdateItemRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'itemID' is not null or undefined
            assertParamExists('itemsItemIDPut', 'itemID', itemID)
            // verify required parameter 'request' is not null or undefined
            assertParamExists('itemsItemIDPut', 'request', request)
            const localVarPath = `/items/{itemID}`
                .replace(`{${"itemID"}}`, encodeURIComponent(String(itemID)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(request, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RootApi - functional programming interface
 * @export
 */
export const RootApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RootApiAxiosParamCreator(configuration)
    return {
        /**
         * An atomic operation that allow to create and delete multiple items
         * @summary Create/Delete items in batch
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryBatchRequest} request Batch request with an array of items to delete and create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gameIDBatchPost(gameID: string, request: InventoryBatchRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<InventoryItem>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gameIDBatchPost(gameID, request, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get items based on filters
         * @summary Get items
         * @param {string} gameID Game ID to filter items
         * @param {Array<string>} [id] Item IDs to filter items
         * @param {Array<string>} [owner] Owners to filter items
         * @param {number} [limit] Number of records per page
         * @param {number} [page] Page number
         * @param {string} [orderBy] field to order the results
         * @param {string} [direction] results ordered ascending or descending
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gameIDItemsGet(gameID: string, id?: Array<string>, owner?: Array<string>, limit?: number, page?: number, orderBy?: string, direction?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryPaginatedItems>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gameIDItemsGet(gameID, id, owner, limit, page, orderBy, direction, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete an item for the given game
         * @summary Delete an item
         * @param {string} gameID Game ID of the item you are trying to delete
         * @param {string} id Item ID to be deleted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gameIDItemsIdDelete(gameID: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gameIDItemsIdDelete(gameID, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Create an item for the given game, owner, location and item definition
         * @summary Create an item
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryCreateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gameIDItemsPost(gameID: string, request: InventoryCreateItemRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryItem>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gameIDItemsPost(gameID, request, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Used to mint items that aren\'t minted yet (pending status)
         * @summary Mint on-chain items in the zkEVM
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryMintItemRequest} request List of item ids to be minted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gameIDMintPost(gameID: string, request: InventoryMintItemRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gameIDMintPost(gameID, request, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get item by ID
         * @summary Get item by ID
         * @param {string} id Item ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async itemsIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryItem>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.itemsIdGet(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update an item\'s metadata
         * @summary Update an item
         * @param {string} itemID Item ID - The identifier of the item you\&#39;re updating
         * @param {InventoryUpdateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async itemsItemIDPut(itemID: string, request: InventoryUpdateItemRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryItem>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.itemsItemIDPut(itemID, request, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RootApi - factory interface
 * @export
 */
export const RootApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RootApiFp(configuration)
    return {
        /**
         * An atomic operation that allow to create and delete multiple items
         * @summary Create/Delete items in batch
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryBatchRequest} request Batch request with an array of items to delete and create
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDBatchPost(gameID: string, request: InventoryBatchRequest, options?: any): AxiosPromise<Array<InventoryItem>> {
            return localVarFp.gameIDBatchPost(gameID, request, options).then((request) => request(axios, basePath));
        },
        /**
         * Get items based on filters
         * @summary Get items
         * @param {string} gameID Game ID to filter items
         * @param {Array<string>} [id] Item IDs to filter items
         * @param {Array<string>} [owner] Owners to filter items
         * @param {number} [limit] Number of records per page
         * @param {number} [page] Page number
         * @param {string} [orderBy] field to order the results
         * @param {string} [direction] results ordered ascending or descending
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsGet(gameID: string, id?: Array<string>, owner?: Array<string>, limit?: number, page?: number, orderBy?: string, direction?: string, options?: any): AxiosPromise<InventoryPaginatedItems> {
            return localVarFp.gameIDItemsGet(gameID, id, owner, limit, page, orderBy, direction, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an item for the given game
         * @summary Delete an item
         * @param {string} gameID Game ID of the item you are trying to delete
         * @param {string} id Item ID to be deleted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsIdDelete(gameID: string, id: string, options?: any): AxiosPromise<void> {
            return localVarFp.gameIDItemsIdDelete(gameID, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Create an item for the given game, owner, location and item definition
         * @summary Create an item
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryCreateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDItemsPost(gameID: string, request: InventoryCreateItemRequest, options?: any): AxiosPromise<InventoryItem> {
            return localVarFp.gameIDItemsPost(gameID, request, options).then((request) => request(axios, basePath));
        },
        /**
         * Used to mint items that aren\'t minted yet (pending status)
         * @summary Mint on-chain items in the zkEVM
         * @param {string} gameID Game ID - The game you\&#39;re creating the item for, must match API Key
         * @param {InventoryMintItemRequest} request List of item ids to be minted
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gameIDMintPost(gameID: string, request: InventoryMintItemRequest, options?: any): AxiosPromise<void> {
            return localVarFp.gameIDMintPost(gameID, request, options).then((request) => request(axios, basePath));
        },
        /**
         * Get item by ID
         * @summary Get item by ID
         * @param {string} id Item ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        itemsIdGet(id: string, options?: any): AxiosPromise<InventoryItem> {
            return localVarFp.itemsIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update an item\'s metadata
         * @summary Update an item
         * @param {string} itemID Item ID - The identifier of the item you\&#39;re updating
         * @param {InventoryUpdateItemRequest} request Item Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        itemsItemIDPut(itemID: string, request: InventoryUpdateItemRequest, options?: any): AxiosPromise<InventoryItem> {
            return localVarFp.itemsItemIDPut(itemID, request, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for gameIDBatchPost operation in RootApi.
 * @export
 * @interface RootApiGameIDBatchPostRequest
 */
export interface RootApiGameIDBatchPostRequest {
    /**
     * Game ID - The game you\&#39;re creating the item for, must match API Key
     * @type {string}
     * @memberof RootApiGameIDBatchPost
     */
    readonly gameID: string

    /**
     * Batch request with an array of items to delete and create
     * @type {InventoryBatchRequest}
     * @memberof RootApiGameIDBatchPost
     */
    readonly request: InventoryBatchRequest
}

/**
 * Request parameters for gameIDItemsGet operation in RootApi.
 * @export
 * @interface RootApiGameIDItemsGetRequest
 */
export interface RootApiGameIDItemsGetRequest {
    /**
     * Game ID to filter items
     * @type {string}
     * @memberof RootApiGameIDItemsGet
     */
    readonly gameID: string

    /**
     * Item IDs to filter items
     * @type {Array<string>}
     * @memberof RootApiGameIDItemsGet
     */
    readonly id?: Array<string>

    /**
     * Owners to filter items
     * @type {Array<string>}
     * @memberof RootApiGameIDItemsGet
     */
    readonly owner?: Array<string>

    /**
     * Number of records per page
     * @type {number}
     * @memberof RootApiGameIDItemsGet
     */
    readonly limit?: number

    /**
     * Page number
     * @type {number}
     * @memberof RootApiGameIDItemsGet
     */
    readonly page?: number

    /**
     * field to order the results
     * @type {string}
     * @memberof RootApiGameIDItemsGet
     */
    readonly orderBy?: string

    /**
     * results ordered ascending or descending
     * @type {string}
     * @memberof RootApiGameIDItemsGet
     */
    readonly direction?: string
}

/**
 * Request parameters for gameIDItemsIdDelete operation in RootApi.
 * @export
 * @interface RootApiGameIDItemsIdDeleteRequest
 */
export interface RootApiGameIDItemsIdDeleteRequest {
    /**
     * Game ID of the item you are trying to delete
     * @type {string}
     * @memberof RootApiGameIDItemsIdDelete
     */
    readonly gameID: string

    /**
     * Item ID to be deleted
     * @type {string}
     * @memberof RootApiGameIDItemsIdDelete
     */
    readonly id: string
}

/**
 * Request parameters for gameIDItemsPost operation in RootApi.
 * @export
 * @interface RootApiGameIDItemsPostRequest
 */
export interface RootApiGameIDItemsPostRequest {
    /**
     * Game ID - The game you\&#39;re creating the item for, must match API Key
     * @type {string}
     * @memberof RootApiGameIDItemsPost
     */
    readonly gameID: string

    /**
     * Item Data
     * @type {InventoryCreateItemRequest}
     * @memberof RootApiGameIDItemsPost
     */
    readonly request: InventoryCreateItemRequest
}

/**
 * Request parameters for gameIDMintPost operation in RootApi.
 * @export
 * @interface RootApiGameIDMintPostRequest
 */
export interface RootApiGameIDMintPostRequest {
    /**
     * Game ID - The game you\&#39;re creating the item for, must match API Key
     * @type {string}
     * @memberof RootApiGameIDMintPost
     */
    readonly gameID: string

    /**
     * List of item ids to be minted
     * @type {InventoryMintItemRequest}
     * @memberof RootApiGameIDMintPost
     */
    readonly request: InventoryMintItemRequest
}

/**
 * Request parameters for itemsIdGet operation in RootApi.
 * @export
 * @interface RootApiItemsIdGetRequest
 */
export interface RootApiItemsIdGetRequest {
    /**
     * Item ID
     * @type {string}
     * @memberof RootApiItemsIdGet
     */
    readonly id: string
}

/**
 * Request parameters for itemsItemIDPut operation in RootApi.
 * @export
 * @interface RootApiItemsItemIDPutRequest
 */
export interface RootApiItemsItemIDPutRequest {
    /**
     * Item ID - The identifier of the item you\&#39;re updating
     * @type {string}
     * @memberof RootApiItemsItemIDPut
     */
    readonly itemID: string

    /**
     * Item Data
     * @type {InventoryUpdateItemRequest}
     * @memberof RootApiItemsItemIDPut
     */
    readonly request: InventoryUpdateItemRequest
}

/**
 * RootApi - object-oriented interface
 * @export
 * @class RootApi
 * @extends {BaseAPI}
 */
export class RootApi extends BaseAPI {
    /**
     * An atomic operation that allow to create and delete multiple items
     * @summary Create/Delete items in batch
     * @param {RootApiGameIDBatchPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public gameIDBatchPost(requestParameters: RootApiGameIDBatchPostRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).gameIDBatchPost(requestParameters.gameID, requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get items based on filters
     * @summary Get items
     * @param {RootApiGameIDItemsGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public gameIDItemsGet(requestParameters: RootApiGameIDItemsGetRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).gameIDItemsGet(requestParameters.gameID, requestParameters.id, requestParameters.owner, requestParameters.limit, requestParameters.page, requestParameters.orderBy, requestParameters.direction, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete an item for the given game
     * @summary Delete an item
     * @param {RootApiGameIDItemsIdDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public gameIDItemsIdDelete(requestParameters: RootApiGameIDItemsIdDeleteRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).gameIDItemsIdDelete(requestParameters.gameID, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create an item for the given game, owner, location and item definition
     * @summary Create an item
     * @param {RootApiGameIDItemsPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public gameIDItemsPost(requestParameters: RootApiGameIDItemsPostRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).gameIDItemsPost(requestParameters.gameID, requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Used to mint items that aren\'t minted yet (pending status)
     * @summary Mint on-chain items in the zkEVM
     * @param {RootApiGameIDMintPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public gameIDMintPost(requestParameters: RootApiGameIDMintPostRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).gameIDMintPost(requestParameters.gameID, requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get item by ID
     * @summary Get item by ID
     * @param {RootApiItemsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public itemsIdGet(requestParameters: RootApiItemsIdGetRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).itemsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update an item\'s metadata
     * @summary Update an item
     * @param {RootApiItemsItemIDPutRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RootApi
     */
    public itemsItemIDPut(requestParameters: RootApiItemsItemIDPutRequest, options?: AxiosRequestConfig) {
        return RootApiFp(this.configuration).itemsItemIDPut(requestParameters.itemID, requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }
}