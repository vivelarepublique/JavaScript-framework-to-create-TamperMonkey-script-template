export interface TreeShakingOptions {
    manualEntry: string | string[];
    componentsFilesPath?: string | string[];
    excludeTags?: string[];
    excludeClassNameKeywords?: string;
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
