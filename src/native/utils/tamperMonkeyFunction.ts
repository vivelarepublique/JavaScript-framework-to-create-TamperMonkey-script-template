/// <reference path="../../types/tampermonkey.d.ts" />

import { TampermonkeyWebRequestParameters } from '../interface/request';

export async function httpRequestReturnXML(request: TampermonkeyWebRequestParameters): Promise<Document | null> {
    const { url, method, headers, data } = request;

    return new Promise(async resolve => {
        if (typeof GM_xmlhttpRequest === 'function') {
            const context = { url, method };
            if (headers) {
                Object.assign(context, headers);
            }
            if (data && method != 'GET') {
                Object.assign(context, data);
            }

            GM_xmlhttpRequest({
                ...context,
                onload: response => {
                    resolve(response.responseXML);
                },
                onerror: _ => resolve(null),
            });
        } else {
            const init = { method };
            if (headers) {
                Object.assign(init, headers);
            }
            if (data && method != 'GET') {
                Object.assign(init, { body: data });
            }

            const response = await fetch(url, init);
            const xml = await response.text();
            response.ok ? resolve(new DOMParser().parseFromString(xml, 'text/html')) : resolve(null);
        }
    });
}

export async function httpRequestReturnJSON(request: TampermonkeyWebRequestParameters): Promise<any | null> {
    const { url, method, headers, data } = request;

    return new Promise(async resolve => {
        if (typeof GM_xmlhttpRequest === 'function') {
            const context = { url, method };
            if (headers) {
                Object.assign(context, headers);
            }
            if (data && method != 'GET') {
                Object.assign(context, data);
            }

            GM_xmlhttpRequest({
                ...context,
                onload: response => {
                    try {
                        resolve(JSON.parse(response.responseText));
                    } catch (error) {
                        console.error(error);
                        resolve(null);
                    }
                },
                onerror: _ => resolve(null),
            });
        } else {
            const init = { method };
            if (headers) {
                Object.assign(init, headers);
            }
            if (data && method != 'GET') {
                Object.assign(init, { body: data });
            }

            const response = await fetch(url, init);
            response.ok ? resolve(await response.json()) : resolve(null);
        }
    });
}

export const windowProxy = typeof unsafeWindow === 'object' ? unsafeWindow : window;
