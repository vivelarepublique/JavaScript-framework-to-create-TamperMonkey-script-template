export interface TreeShakingOptions {
    manualEntry: string | string[];
    componentsFilesPath?: string | string[];
    excludeTags?: string[];
    excludeClassNameKeywords?: string;
}
