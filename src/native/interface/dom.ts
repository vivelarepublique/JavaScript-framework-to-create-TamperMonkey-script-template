export interface IndexedByStringElement extends HTMLElement {
    [key: string]: any;
}

export interface customEventListener<K extends keyof HTMLElementEventMap> {
    type: string | K;
    listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | EventListenerOrEventListenerObject;
}
