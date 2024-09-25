import type { SecureHashAlgorithm, KeyFormatExceptJWK } from '../interface/crypto';

export async function hash(message: string, algorithm: SecureHashAlgorithm = 'SHA-256'): Promise<ArrayBuffer> {
    return await window.crypto.subtle.digest(algorithm, new TextEncoder().encode(message));
}

export async function hashReturnUint8Array(message: string, algorithm: SecureHashAlgorithm = 'SHA-256'): Promise<Uint8Array> {
    const ab = await hash(message, algorithm);
    return new Uint8Array(ab);
}

export async function hashReturnHex(message: string, algorithm: SecureHashAlgorithm = 'SHA-256'): Promise<string> {
    const ua = await hashReturnUint8Array(message, algorithm);
    return Array.from(ua)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function hmac(key: Uint8Array | string, message: string, format: KeyFormatExceptJWK = 'raw', algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm = { name: 'HMAC', hash: 'SHA-256' }, extract: boolean = false, keyUsage: KeyUsage[] = ['sign']): Promise<ArrayBuffer> {
    const data = key instanceof Uint8Array ? key : new TextEncoder().encode(key);
    const al = typeof algorithm === 'object' ? algorithm.name : algorithm;
    const ck = await window.crypto.subtle.importKey(format, data, algorithm, extract, keyUsage);
    return await crypto.subtle.sign(al, ck, new TextEncoder().encode(message));
}

export async function hmacReturnUint8Array(key: Uint8Array | string, message: string, format: KeyFormatExceptJWK = 'raw', algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm = { name: 'HMAC', hash: 'SHA-256' }, extract: boolean = false, keyUsage: KeyUsage[] = ['sign']): Promise<Uint8Array> {
    const ab = await hmac(key, message, format, algorithm, extract, keyUsage);
    return new Uint8Array(ab);
}

export async function hmacReturnHex(key: Uint8Array | string, message: string, format: KeyFormatExceptJWK = 'raw', algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm = { name: 'HMAC', hash: 'SHA-256' }, extract: boolean = false, keyUsage: KeyUsage[] = ['sign']): Promise<string> {
    const ua = await hmacReturnUint8Array(key, message, format, algorithm, extract, keyUsage);
    return Array.from(ua)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
