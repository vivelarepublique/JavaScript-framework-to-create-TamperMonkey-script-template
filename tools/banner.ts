export function countAllUniqueHostnames(code: string): string[] {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    const urls = code.match(urlRegex);
    return urls ? [...new Set(urls.map(url => new URL(url).hostname))] : [];
}

export function countAllUniqueGrants(code: string): string[] {
    const grantRegex = /(GM_[a-zA-Z]+)|unsafeWindow/gm;
    const grants = code.match(grantRegex);
    return grants ? [...new Set(grants)] : [];
}

export function returnUniformLengthParameter(parameter: string[], name: string): string {
    return parameter.reduce((accelerator, current, index, self) => accelerator + '// @' + name + ' '.repeat(13 - name.length) + current + (index === self.length - 1 ? '' : '\n'), '');
}

export function generateNewVersionId(date: Date = new Date()): string {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}
