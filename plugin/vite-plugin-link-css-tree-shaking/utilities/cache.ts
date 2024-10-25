import fs from 'node:fs';

export function createCache(name: string, content: string) {
    if (!fs.existsSync('cache')) {
        fs.mkdirSync('cache');
    }
    fs.writeFileSync(`cache/${name}`, content, 'utf-8');
}

export function getCache(name: string): string {
    return fs.readFileSync(`cache/${name}`, 'utf-8');
}

export function existsCache(name: string): boolean {
    return fs.existsSync(`cache/${name}`);
}

export function pickupCacheName(href: string) {
    const url = new URL(href);
    const array = url.pathname.split('/');

    return array.length === 0 ? '' : array.pop()!;
}
