export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null = null;

    return (...args) => {
        if (timeout !== null) window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
    };
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let timer: number | null = null;

    return (...args) => {
        if (!timer) {
            timer = window.setTimeout(() => {
                func(...args);
                timer = null;
            }, limit);
        }
    };
}
