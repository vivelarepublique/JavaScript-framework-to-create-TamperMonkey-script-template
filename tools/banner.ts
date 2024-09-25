import { removeDuplicates, hashReturnHex } from './utils';
import type { ScriptInformationParameters } from '../types';

function countAllUniqueHostnames(code: string): string[] {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
    const urls = code.match(urlRegex);
    return urls ? removeDuplicates(urls.map(url => new URL(url).hostname)) : [];
}

function countAllUniqueGrants(code: string): string[] {
    const grantRegex = /(GM_[a-zA-Z]+)|unsafeWindow/gm;
    const grants = code.match(grantRegex);
    return grants ? removeDuplicates(grants) : [];
}

function returnUniformLengthParameter(parameter: string[], name: string): string {
    return parameter.reduce((accelerator, current, index, self) => accelerator + '// @' + name + ' '.repeat(13 - name.length) + current + (index === self.length - 1 ? '' : '\n'), '');
}

function generateNewVersionId(date: Date = new Date()): string {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
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
    const { name, namespace, version, description, author, runtime, matchUrl, grant, connect } = details;
    const grants = removeDuplicates(countAllUniqueGrants(code).concat(grant));
    const connects = removeDuplicates(countAllUniqueHostnames(code).concat(connect));
    return `// ==UserScript==
// @name         ${name}
// @namespace    ${namespace}
// @version      ${version || generateNewVersionId()}
// @description  ${description}
// @author       ${author}
// @run-at       ${runtime}
${returnUniformLengthParameter(matchUrl, 'match')}
${returnUniformLengthParameter(grants, 'grant')}
${returnUniformLengthParameter(connects, 'connect')}
// ==/UserScript==
`;
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
