export interface TreeShakingOptions {
    manualEntry?: string | string[];
    componentsFilesPath?: string | string[];
    excludeTags?: string[];
    excludeClassNameKeywords?: string;
    replaceVariableDeclarations?: boolean;
}

export interface KeyAndValueObject {
    key: string;
    value: string;
}

export interface CssRuleObject {
    selector: string;
    content: string;
}

export interface CssRuleObjectArrayBasic {
    selectors: string[];
    contents: string[];
}

export interface CssRuleObjectArray {
    selectors: string[];
    contents: CssRuleObjectArrayBasic[] | string[];
}

export interface FiltrationCondition {
    tags: string[];
    classes: string[];
}

export interface HTMLStructure {
    html: {
        head: {
            meta: any[];
            title: string;
            link?: { __rel: string; __href: string } | { __rel: string; __href: string }[];
        };
        body: {
            scripts: { __type: string; __src: string } | { __type: string; __src: string }[];
        };
        __lang?: string;
    };
}
