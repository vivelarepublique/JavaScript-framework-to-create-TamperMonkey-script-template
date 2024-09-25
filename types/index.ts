export interface ScriptInformationParameters {
    name: string;
    namespace: string;
    version: string;
    description: string;
    author: string;
    matchUrl: string[];
    runtime: string;
    grant: string[];
    connect: string[];
}

export interface TreeShakingConfig {
    cssPath: string;
    framework: string | string[];
}

export type SecureHashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';
