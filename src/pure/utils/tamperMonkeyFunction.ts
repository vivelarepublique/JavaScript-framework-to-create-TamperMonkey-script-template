/// <reference path="../declaration/custom-tampermonkey.d.ts" />

import { NewRequest, RequestMethods } from '../entities/request';

async function httpRequestReturnXML(url: string, method: RequestMethods, data?: any, headers?: any): Promise<Document | null> {
    return new Promise(resolve => {
        const request: NewRequest = {
            url: url,
            method: method,
        };
        if (data) request.data = data;
        if (headers) request.headers = headers;

        GM_xmlhttpRequest({
            ...request,
            onload: response => {
                resolve(response.responseXML);
            },
            onerror: _ => resolve(null),
        });
    });
}

async function httpRequestReturnString(url: string, method: RequestMethods, data?: any, headers?: any): Promise<string | null> {
    return new Promise(resolve => {
        const request: NewRequest = {
            url: url,
            method: method,
        };
        if (data) request.data = data;
        if (headers) request.headers = headers;

        GM_xmlhttpRequest({
            ...request,
            onload: response => {
                resolve(response.responseText);
            },
            onerror: _ => resolve(null),
        });
    });
}

const windowProxy = unsafeWindow;

export { httpRequestReturnXML, httpRequestReturnString, windowProxy };
