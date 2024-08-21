export function getAllUniqueHostname(code) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    const urls = code.match(urlRegex);
    return [...new Set(urls.map(url => new URL(url).hostname))];
}

export function getAllUniqueGrant(code) {
    const grantRegex = /(GM_[a-zA-Z]+)|unsafeWindow/gm;
    const grants = code.match(grantRegex);
    return [...new Set(grants)];
}

export function getMultiParameters(parameter, name) {
    return parameter.reduce((accelerator, current, index, self) => accelerator + '// @' + name + ' '.repeat(13 - name.length) + current + (index === self.length - 1 ? '' : '\n'), '');
}

export function getNewVersionId(date = new Date()) {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}
