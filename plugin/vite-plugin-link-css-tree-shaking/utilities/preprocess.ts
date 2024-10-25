import fs from 'node:fs';
import fetch from 'node-fetch';
import { isMinCssAndExists } from './judgement';
import { removeCommentsAndCharset } from './replace';

export function readLocalFile(filePath: string | string[]): string {
    if (Array.isArray(filePath)) {
        return filePath.reduce((previous, current) => {
            if (!isMinCssAndExists(current)) return previous;
            const content = fs.readFileSync(current, 'utf-8');
            return previous + removeCommentsAndCharset(content);
        }, '');
    } else {
        if (!isMinCssAndExists(filePath)) return '';
        const content = fs.readFileSync(filePath, 'utf-8');
        return removeCommentsAndCharset(content);
    }
}

export async function readRemoteResource(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.url.endsWith('.min.css')) {
        throw new Error(`Remote resource is not a minified CSS file: ${url}`);
    }
    if (response.ok && response.status === 200) {
        const content = await response.text();
        return removeCommentsAndCharset(content);
    } else {
        return '';
    }
}
