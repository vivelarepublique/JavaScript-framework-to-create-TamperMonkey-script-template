type ActionFunction = (...args: any[]) => any;
type DelayWay = 'debounce' | 'throttle' | 'none';

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

interface ListenOptions {
    callback: ActionFunction;
    attributesConcern?: string;
    childrenConcern?: string[];
    immediateImplementation?: boolean;
    triggerLimitation?: DelayOptions;
    manualSetupOptions?: MutationsOptions;
}

export { ListenOptions };
