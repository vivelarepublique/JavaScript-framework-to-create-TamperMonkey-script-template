type PathType = 'text/javascript' | 'module';

export interface ScriptOptions {
    type: PathType;
    src: string;
}

export interface LinkOptions {
    rel: 'stylesheet';
    href: string;
    integrity?: string;
    crossorigin?: string;
}
