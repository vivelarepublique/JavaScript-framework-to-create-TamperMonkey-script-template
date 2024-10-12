/// <reference path="../../declaration/tampermonkey.d.ts" />

import type { TampermonkeyWebRequestParameters } from '../interface/request';

function getContentType(headers: string): string {
    return headers.match(/[a-z]+\/[a-z]+(?=;\s?charset)/)?.join('') || '';
}

function responseOK(response: Response): boolean {
    return response.ok && response.status >= 200 && response.status < 300;
}

export async function httpRequest(request: TampermonkeyWebRequestParameters): Promise<any> {
    const { url, method, headers, data, timeout, anonymous } = request;
    const noCookie = typeof anonymous === 'undefined' || anonymous;

    if (typeof GM_xmlhttpRequest === 'function') {
        return new Promise(resolve => {
            const context: TampermonkeyWebRequestParameters = { url, method };
            if (headers) {
                Object.assign(context, headers);
            }
            if (data && method != 'GET') {
                Object.assign(context, data);
            }

            GM_xmlhttpRequest({
                fetch: true,
                timeout: timeout || 60 * 1000,
                anonymous: noCookie,
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
                onabort: () => resolve(null),
                onerror: _ => resolve(null),
            });
        });
    } else {
        const controller = new AbortController();
        const { signal, abort } = controller;
        const timeoutId = setTimeout(() => {
            abort();
        }, timeout || 60 * 1000);

        const init: RequestInit = { method, signal, credentials: noCookie ? 'omit' : 'include' };
        if (headers) {
            Object.assign(init, headers);
        }
        if (data && method != 'GET') {
            Object.assign(init, { body: data });
        }

        try {
            const response = await fetch(url, init);
            clearTimeout(timeoutId);

            const ok = responseOK(response);

            if (ok) {
                const contentType = getContentType(response.headers.get('content-type') || '');

                if (contentType === 'application/json') {
                    return await response.json();
                } else if (contentType === 'application/xml' || contentType === 'text/xml' || contentType === 'text/html') {
                    const xml = await response.text();
                    return new DOMParser().parseFromString(xml, 'text/html');
                } else {
                    return await response.text();
                }
            } else {
                return null;
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error(`Request timed out after ${timeout} ms`);
            }
            throw error;
        }
    }
}

export const windowProxy: {
    [key: string]: any;
} = typeof unsafeWindow === 'object' ? unsafeWindow : window;
