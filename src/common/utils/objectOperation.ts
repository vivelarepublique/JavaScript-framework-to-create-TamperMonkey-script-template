export function deepEqual(original: { [key: string]: any } | null, reference: { [key: string]: any } | null): boolean {
    if (original === reference) return true;

    if (typeof original !== 'object' || original === null || typeof reference !== 'object' || reference === null) return false;

    const originalKeys = Object.keys(original);
    const referenceKeys = Object.keys(reference);

    if (originalKeys.length !== referenceKeys.length) return false;

    for (let key of originalKeys) {
        if (!referenceKeys.includes(key) || !deepEqual(original[key], reference[key])) return false;
    }

    return true;
}

export function deepClone(obj: { [key: string]: any } | null): { [key: string]: any } | null {
    try {
        if (obj === null || typeof obj !== 'object') throw new Error('Cannot clone non-object.');
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        console.error('Object cannot be serialized:', error);
        return null;
    }
}
