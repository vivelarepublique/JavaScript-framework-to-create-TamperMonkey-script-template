export interface ScriptInformationParameters {
    name: string;
    namespace: string;
    version: string;
    description: string;
    author: string;
    match: string[];
    runAt?: string;
    runIn?: string;
    sandbox?: string;
    tag?: string[];
    noframes?: boolean;
    grant?: string[];
    connect?: string | string[];
}

export type SecureHashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

export interface PluginOption {
    bannerConfig: ScriptInformationParameters;
    beautifulCss?: boolean;
}
