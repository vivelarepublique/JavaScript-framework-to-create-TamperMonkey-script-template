export interface TreeShakingConfig {
    cssFilesPath: string | string[];
    frameworkComponentsPath: string | string[];
}

export interface TreeShakingOptions extends TreeShakingConfig {
    excludeTags?: string[];
    excludeClassNameKeywords?: string;
}
