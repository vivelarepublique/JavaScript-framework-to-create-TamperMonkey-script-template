/**
 *
 * @param {string} code
 * @returns {string[]}
 */
export function getAllUniqueHostname(code) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    const urls = code.match(urlRegex);
    return urls ? [...new Set(urls.map(url => new URL(url).hostname))] : [];
}

/**
 *
 * @param {string} code
 * @returns {string[]}
 */
export function getAllUniqueGrant(code) {
    const grantRegex = /(GM_[a-zA-Z]+)|unsafeWindow/gm;
    const grants = code.match(grantRegex);
    return grants ? [...new Set(grants)] : [];
}

/**
 *
 * @param {string[]} parameter
 * @param {string} name
 * @returns {string}
 */
export function getMultiParameters(parameter, name) {
    return parameter.reduce((accelerator, current, index, self) => accelerator + '// @' + name + ' '.repeat(13 - name.length) + current + (index === self.length - 1 ? '' : '\n'), '');
}

/**
 *
 * @param {Date} date
 * @returns {string}
 */
export function getNewVersionId(date = new Date()) {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}
