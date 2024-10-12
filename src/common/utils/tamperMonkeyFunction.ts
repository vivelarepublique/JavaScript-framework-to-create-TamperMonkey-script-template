/// <reference path="../../declaration/tampermonkey.d.ts" />

import type { TampermonkeyWebRequestParameters } from '../interface/request';

function getContentType(headers: string): string {
    return headers.match(/[a-z]+\/[a-z]+(?=;\s?charset)/)?.join('') || '';
}

export async function httpRequest(request: TampermonkeyWebRequestParameters): Promise<any> {
    const { url, method, headers, data } = request;

    if (typeof GM_xmlhttpRequest === 'function') {
        return new Promise(resolve => {
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
                    const contentType = getContentType(response.responseHeaders);

                    if (contentType === 'application/json') {
                        resolve(JSON.parse(response.responseText));
                    } else if (contentType === 'application/xml' || contentType === 'text/xml' || contentType === 'text/html') {
                        resolve(response.responseXML);
                    } else {
                        resolve(response.responseText);
                    }
                },
                onerror: _ => resolve(null),
            });
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
        const contentType = getContentType(response.headers.get('content-type') || '');

        if (contentType === 'application/json') {
            return response.ok ? response.json() : null;
        } else if (contentType === 'application/xml' || contentType === 'text/xml' || contentType === 'text/html') {
            if (response.ok) {
                const xml = await response.text();
                return new DOMParser().parseFromString(xml, 'text/html');
            } else {
                return null;
            }
        } else {
            return response.ok ? response.text() : null;
        }
    }
}

export const windowProxy: {
    [key: string]: any;
} = typeof unsafeWindow === 'object' ? unsafeWindow : window;
