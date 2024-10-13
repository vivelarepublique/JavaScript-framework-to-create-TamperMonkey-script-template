export function removeCommentsAndCharset(content: string): string {
    return content.replaceAll(/(@charset "UTF-8";)|(\/\*[\s\S]*?\*\/)/g, '');
}

export function simplifySelector(selector: string): string {
    return selector.replaceAll(/[\+\>\*]|\[.*?\]|:{1,2}[a-z-]+(\(.*?\))?/g, '');
}
