interface ListenOptions {
    callback?: (...args: any[]) => any;
    attributesConcern?: string;
    childrenConcern?: {
        action: (...args: any[]) => any;
        target: string;
    }[];
    immediateImplementation?: boolean;
    triggerLimitation?: {
        delay: number;
        way: 'debounce' | 'throttle' | 'none';
    };
    manualSetupOptions?: {
        childList?: boolean;
        subtree?: boolean;
        attributes?: boolean;
    };
}

export { ListenOptions };
