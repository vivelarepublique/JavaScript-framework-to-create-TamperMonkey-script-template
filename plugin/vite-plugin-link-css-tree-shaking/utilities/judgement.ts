import { existsSync } from 'node:fs';

export function isMinCssAndExists(filePath: string): boolean {
    return filePath.endsWith('.min.css') && existsSync(filePath);
}

export function isComponentsFile(file: string): boolean {
    return file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.vue') || file.endsWith('.svelte');
}
