type PathType = 'text/javascript' | 'module';

export interface ScriptOptions extends Pick<HTMLScriptElement, 'src' | 'type'> {
    type: PathType;
}

export interface LinkOptions extends Partial<Pick<HTMLLinkElement, 'rel' | 'href' | 'integrity' | 'crossOrigin'>> {}

export interface IndexedByStringElement extends HTMLElement {
    [key: string]: any;
}

export interface CustomEventListener<K extends keyof HTMLElementEventMap> {
    type: string | K;
    listener: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any) | EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
}

export interface CommonSelectors extends Partial<Pick<HTMLElement, 'id' | 'className' | 'tagName'>> {
    tagName: keyof HTMLElementTagNameMap | string;
    other?: string;
}
