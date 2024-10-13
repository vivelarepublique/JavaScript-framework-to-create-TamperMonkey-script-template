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
