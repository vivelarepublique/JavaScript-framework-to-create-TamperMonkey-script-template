type ActionFunction = (value: string) => void;

interface MutationsOptions {
    childList?: boolean;
    subtree?: boolean;
    attributes?: boolean;
}

export { ActionFunction, MutationsOptions };
