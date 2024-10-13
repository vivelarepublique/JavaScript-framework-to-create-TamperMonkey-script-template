import type { SecureHashAlgorithm } from './types';

export function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

export async function hashReturnHex(message: string, algorithm: SecureHashAlgorithm = 'SHA-256'): Promise<string> {
    const hash = await crypto.subtle.digest(algorithm, new TextEncoder().encode(message));
    const array = new Uint8Array(hash);
    return Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
