interface ElementProperties {
    id?: string;
    alt?: string;
    type?: string;
    className?: string;
    textContent?: string;
    html?: string;
    src?: string;
    href?: string;
    disabled?: boolean;
    value?: string;
    rel?: string;
}

interface RealElement extends Element {
    [key: string]: any;
}

interface customEvent {
    name: string;
    callback: (...args: any[]) => any;
}

export type { ElementProperties, RealElement, customEvent };
