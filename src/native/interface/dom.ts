export interface RealElement extends Element {
    [key: string]: any;
}

export interface customEvent {
    name: string;
    callback: (...args: any[]) => any;
}
