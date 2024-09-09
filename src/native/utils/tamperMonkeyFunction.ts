/// <reference path="../../types/tampermonkey.d.ts" />

import { TampermonkeyWebRequestParameters, RequestMethods } from '../interface/request';

export async function httpRequestReturnXML(url: string, method: RequestMethods, data?: any, headers?: any): Promise<Document | null> {
    return new Promise(resolve => {
        const request: TampermonkeyWebRequestParameters = { url, method };
        if (data) {
            Object.assign(request, data);
        }
        if (headers) {
            Object.assign(request, headers);
        }

        GM_xmlhttpRequest({
            ...request,
            onload: response => {
                resolve(response.responseXML);
            },
            onerror: _ => resolve(null),
        });
    });
}

export async function httpRequestReturnString(url: string, method: RequestMethods, data?: any, headers?: any): Promise<string | null> {
    return new Promise(resolve => {
        const request: TampermonkeyWebRequestParameters = { url, method };
        if (data) {
            Object.assign(request, data);
        }
        if (headers) {
            Object.assign(request, headers);
        }

        GM_xmlhttpRequest({
            ...request,
            onload: response => {
                resolve(response.responseText);
            },
            onerror: _ => resolve(null),
        });
    });
}

export const windowProxy = typeof unsafeWindow === 'object' ? unsafeWindow : window;
