type RequestMethods = 'GET' | 'HEAD' | 'POST';

interface NewRequest {
    url: string;
    method: RequestMethods;
    data?: any;
    headers?: any;
}

export { RequestMethods, NewRequest };
