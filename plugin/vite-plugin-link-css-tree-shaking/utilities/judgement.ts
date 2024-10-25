import fs from 'node:fs';

export function isMinCssAndExists(filePath: string): boolean {
    return filePath.endsWith('.min.css') && fs.existsSync(filePath);
}

export function isComponentsFile(file: string): boolean {
    return file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.vue') || file.endsWith('.svelte');
}

export function isURL(value: string): boolean {
    const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

    const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
    const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

    if (typeof value !== 'string') {
        return false;
    }

    const match = value.match(protocolAndDomainRE);
    if (!match) {
        return false;
    }

    const everythingAfterProtocol = match[1];
    if (!everythingAfterProtocol) {
        return false;
    }

    if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
        return true;
    }

    return false;
}
