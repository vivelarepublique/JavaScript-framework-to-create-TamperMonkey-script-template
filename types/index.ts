export interface ScriptInformationParameters {
    name: string;
    namespace: string;
    description: string;
    author: string;
    matchUrl: string[];
    runtime: string;
    grant: string[];
    connect: string[];
}

export interface TreeShakingConfig {
    cssPath: string;
    componentsPaths?: string[];
}
