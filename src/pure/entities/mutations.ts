type ActionFunction = (value?: string) => void;
type DelayWay = 'debounce' | 'throttle';

interface MutationsOptions {
    childList?: boolean;
    characterData?: boolean;
    subtree?: boolean;
    attributes?: boolean;
}

interface DelayOptions {
    delay: number;
    way: DelayWay;
}

export { ActionFunction, MutationsOptions, DelayOptions };
