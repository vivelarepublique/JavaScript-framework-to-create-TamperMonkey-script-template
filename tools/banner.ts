import { removeDuplicates, hashReturnHex, urlRegex } from './utils';
import type { ScriptInformationParameters } from '../types';

function generalParameter(key: string, value?: string) {
    return value ? `// @${key + ' '.repeat(13 - key.length) + value}\n` : `// @${key}\n`;
}

function optionalParameter(key: string, value?: string | string[]) {
    return value ? (Array.isArray(value) ? parameterArray(value, key) : generalParameter(key, value)) : '';
}

function parameterArray(array: string[], key: string): string {
    return array.reduce((accelerator, current) => accelerator + generalParameter(key, current), '');
}

function countAllUniqueHostnames(code: string): string[] {
    const urls = code.match(urlRegex);
    return urls ? removeDuplicates(urls.map(url => new URL(url).hostname)) : [];
}

function countAllUniqueGrants(code: string): string[] {
    const grantRegex = /(GM_[a-zA-Z]+)|unsafeWindow/g;
    const grants = code.match(grantRegex);
    return grants ? removeDuplicates(grants) : [];
}

function generateNewVersionId(date: Date = new Date()): string {
    return date.getFullYear() - 2021 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}

export async function cssTemplate(code: string, name: string): Promise<string> {
    const cssCode = '/*css*/`\n' + code + '`';
    const hashSub = (await hashReturnHex(code)).substring(0, 8);
    return /*javascript*/ `const ${name}_${hashSub} = document.createElement('style');
const ${name}_${hashSub}_Code = document.createTextNode(${cssCode});
${name}_${hashSub}.appendChild(${name}_${hashSub}_Code);
document.head.appendChild(${name}_${hashSub});`;
}

export function bannerTemplate(code: string, details: ScriptInformationParameters) {
    const { name, namespace, version, description, author, match, runAt, runIn, sandbox, tag, noframes, grant, connect } = details;
    const grants = grant ? removeDuplicates(countAllUniqueGrants(code).concat(grant)) : [];
    const connects = connect ? (connect === '*' ? ['*'] : removeDuplicates(countAllUniqueHostnames(code).concat(connect))) : [];
    return (
        '// ==UserScript==\n' +
        generalParameter('name', name) +
        generalParameter('namespace', namespace) +
        generalParameter('version', version || generateNewVersionId()) +
        generalParameter('description', description) +
        generalParameter('author', author) +
        parameterArray(match, 'match') +
        optionalParameter('run-at', runAt) +
        optionalParameter('run-in', runIn) +
        optionalParameter('sandbox', sandbox) +
        (noframes ? generalParameter('noframes') : '') +
        (tag ? parameterArray(tag, 'tag') : '') +
        parameterArray(grants, 'grant') +
        parameterArray(connects, 'connect') +
        '// ==/UserScript==\n'
    );
}

export function jsTemplate(banner: string, css: string, code: string) {
    const codeWithoutComments = code.replace(/(\/\*[\s\S]*?\*\/)/g, '');
    return /*javascript*/ `${banner}
(function () {
'use strict';
${css}
${codeWithoutComments}
})();`;
}
