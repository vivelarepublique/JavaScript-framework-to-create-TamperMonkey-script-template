import { SecureHashAlgorithm } from '../interfaces';

export async function hash(message: string, algorithm: SecureHashAlgorithm = 'SHA-256'): Promise<string> {
    const hash = await crypto.subtle.digest(algorithm, new TextEncoder().encode(message));
    const array = new Uint8Array(hash);
    return Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
