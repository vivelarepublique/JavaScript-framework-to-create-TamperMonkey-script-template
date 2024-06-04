function getNewVersionId(date = new Date()) {
    return date.getFullYear() - 2023 + '.' + date.getMonth() + '.' + (date.getDate() - 1);
}

function getMultiParameters(parameter, name) {
    return parameter.reduce((acc, cur, index, self) => acc + '// @' + name + ' '.repeat(13 - name.length) + cur + (index === self.length - 1 ? '' : '\n'), '');
}

const config = {
    name: 'vue-or-react-create-tampermonkey-script-template',
    namespace: 'http://tampermonkey.net/',
    description: 'try to take over the world!',
    author: 'vivelarepublique',
    matchUrl: ['https://www.baidu.com/*'],
    grant: ['GM_xmlhttpRequest', 'unsafeWindow'],
    runtime: 'document-idle',
    connect: ['www.bytedance.com'],
};

const banner = `// ==UserScript==
// @name         ${config.name}
// @namespace    ${config.namespace}
// @version      ${getNewVersionId()}
// @description  ${config.description}
// @author       ${config.author}
// @run-at       ${config.runtime}
${getMultiParameters(config.matchUrl, 'match')}
${getMultiParameters(config.grant, 'grant')}
${getMultiParameters(config.connect, 'connect')}
// ==/UserScript==
`;

const scriptFilename = `${config.name}.user.js`;
module.exports = {
    banner,
    scriptFilename,
};
