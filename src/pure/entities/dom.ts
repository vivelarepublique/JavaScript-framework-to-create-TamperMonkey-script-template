interface NewElement {
    name: string;
    id?: string;
    className?: string;
    styles?: string;
    text?: string;
    html?: string;
    src?: string;
    href?: string;
}

interface SelectorOptions {
    all: boolean;
}

export { NewElement, SelectorOptions };
