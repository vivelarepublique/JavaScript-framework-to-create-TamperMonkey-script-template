interface NewElement {
    name: string;
    id?: string;
    alt?: string;
    className?: string;
    type?: string;
    styles?: string;
    text?: string;
    html?: string;
    src?: string;
    href?: string;
    disabled?: boolean;
    value?: string;
    rel?: string;
}

interface SelectorOptions {
    all: boolean;
}

export { NewElement, SelectorOptions };
