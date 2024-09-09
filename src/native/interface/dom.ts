export interface RealElement extends Element {
    [key: string]: any;
}

export interface customEventListener<K extends keyof HTMLElementEventMap> {
    type: string | K;
    listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | EventListenerOrEventListenerObject;
}
