export type RequestMethods = 'GET' | 'HEAD' | 'POST';

export interface RequestHeaders {
    readonly [header: string]: string;
}

export interface TampermonkeyWebRequestParameters {
    url: string;
    method: RequestMethods;
    headers?: RequestHeaders;
    data?: string;
    redirect?: 'follow' | 'error' | 'manual';
    cookie?: string;
    binary?: boolean;
    nocache?: boolean;
    revalidate?: boolean;
    timeout?: number;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'stream';
    overrideMimeType?: string;
    anonymous?: boolean;
    fetch?: boolean;
    user?: string;
    password?: string;
}
