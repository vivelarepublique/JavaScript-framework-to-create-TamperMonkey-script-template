export type RequestMethods = 'GET' | 'HEAD' | 'POST';

export interface TampermonkeyWebRequestParameters {
    url: string;
    method: RequestMethods;
    data?: any;
    headers?: any;
}
