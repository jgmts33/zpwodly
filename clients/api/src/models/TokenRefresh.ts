/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TokenRefresh
 */
export interface TokenRefresh {
    /**
     * 
     * @type {string}
     * @memberof TokenRefresh
     */
    refresh: string;
    /**
     * 
     * @type {string}
     * @memberof TokenRefresh
     */
    readonly access?: string;
}

export function TokenRefreshFromJSON(json: any): TokenRefresh {
    return TokenRefreshFromJSONTyped(json, false);
}

export function TokenRefreshFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenRefresh {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'refresh': json['refresh'],
        'access': !exists(json, 'access') ? undefined : json['access'],
    };
}

export function TokenRefreshToJSON(value?: TokenRefresh | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'refresh': value.refresh,
    };
}


