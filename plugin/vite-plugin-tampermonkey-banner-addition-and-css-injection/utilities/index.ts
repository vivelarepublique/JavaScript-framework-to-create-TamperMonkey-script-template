import { removeDuplicates } from './common';
import { hash } from './crypto';
import { generalParameter, optionalParameter, parameterArray } from './parameter';
import { countAllUniqueHostnames, countAllUniqueGrants } from './count';
import { generateNewVersionId } from './id';
import type { ScriptInformationParameters } from '../interfaces';

export { splitCssToArray } from './split';

export async function cssTemplate(code: string, name: string): Promise<string> {
    const cssCode = '/*css*/`\n' + code + '`';
    const hashSub = (await hash(code)).substring(0, 8);
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
