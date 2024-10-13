export function generalParameter(key: string, value?: string) {
    return value ? `// @${key + ' '.repeat(13 - key.length) + value}\n` : `// @${key}\n`;
}

export function optionalParameter(key: string, value?: string | string[]) {
    return value ? (Array.isArray(value) ? parameterArray(value, key) : generalParameter(key, value)) : '';
}

export function parameterArray(array: string[], key: string): string {
    return array.reduce((accelerator, current) => accelerator + generalParameter(key, current), '');
}
