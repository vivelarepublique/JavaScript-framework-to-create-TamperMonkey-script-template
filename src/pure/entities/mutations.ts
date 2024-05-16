type ActionFunction = (value?: string) => void;

interface MutationsOptions {
    childList?: boolean;
    characterData?: boolean;
    subtree?: boolean;
    attributes?: boolean;
}

export { ActionFunction, MutationsOptions };
