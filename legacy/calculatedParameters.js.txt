import parameters from './parameters.json' with { type: "json" };

function getNewVersionId(date = new Date()) {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}

function getMultiParameters(parameter, name) {
    return parameter.reduce((acc, cur, index, self) => acc + '// @' + name + ' '.repeat(13 - name.length) + cur + (index === self.length - 1 ? '' : '\n'), '');
}

const banner = `// ==UserScript==
// @name         ${parameters.name}
// @namespace    ${parameters.namespace}
// @version      ${getNewVersionId()}
// @description  ${parameters.description}
// @author       ${parameters.author}
// @run-at       ${parameters.runtime}
${getMultiParameters(parameters.matchUrl, 'match')}
${getMultiParameters(parameters.grant, 'grant')}
${getMultiParameters(parameters.connect, 'connect')}
// ==/UserScript==
`;

const scriptFilename = `${parameters.name}.user.js`;
export default {
    banner,
    scriptFilename,
};
