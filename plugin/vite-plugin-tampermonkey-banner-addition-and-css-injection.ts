import { Rollup, Plugin } from 'vite';
import { countAllUniqueHostnames, countAllUniqueGrants, returnUniformLengthParameter, generateNewVersionId } from '../tools/banner';
import { removeDuplicates } from '../tools/utils';
import type { ScriptInformationParameters } from '../types';

export default function vitePluginTampermonkeyBannerAdditionAndCssInjection({ bannerConfig }: { bannerConfig: ScriptInformationParameters }): Plugin {
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        generateBundle(_: Rollup.OutputOptions, bundle: { [fileName: string]: Rollup.OutputAsset | Rollup.OutputChunk }) {
            const jsBundleNames = Object.keys(bundle).filter(b => bundle[b].type == 'chunk' && bundle[b].fileName.endsWith('.js'));
            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');
            const entry = bundle[jsBundleNames[0]] as Rollup.OutputChunk;

            const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
            const allCssCode = cssBundleNames.reduce((accumulator, current) => {
                const cssSource = (bundle[current] as Rollup.OutputAsset).source;
                delete bundle[current];
                return accumulator + cssSource;
            }, '');

            const injectCss = (css: string) => {
                const cssCode = '/*css*/`\n' + css + '`';
                return /*javascript*/ `const vitePluginTampermonkeyTemplateCssInjection = document.createElement('style');
const vitePluginTampermonkeyTemplateCssInjectionCode = document.createTextNode(${cssCode});
vitePluginTampermonkeyTemplateCssInjection.appendChild(vitePluginTampermonkeyTemplateCssInjectionCode);
document.head.appendChild(vitePluginTampermonkeyTemplateCssInjection);`;
            };

            const grants = removeDuplicates(countAllUniqueGrants(entry.code).concat(bannerConfig.grant));
            const connects = removeDuplicates(countAllUniqueHostnames(entry.code).concat(bannerConfig.connect));
            const banner = `// ==UserScript==
// @name         ${bannerConfig.name}
// @namespace    ${bannerConfig.namespace}
// @version      ${bannerConfig.version || generateNewVersionId()}
// @description  ${bannerConfig.description}
// @author       ${bannerConfig.author}
// @run-at       ${bannerConfig.runtime}
${returnUniformLengthParameter(bannerConfig.matchUrl, 'match')}
${returnUniformLengthParameter(grants, 'grant')}
${returnUniformLengthParameter(connects, 'connect')}
// ==/UserScript==
`;
            entry.code = /*javascript*/ `${banner}
(function () {
'use strict';
${allCssCode.length === 0 ? '' : injectCss(allCssCode)}
${entry.code.replace(/(\/\*[\s\S]*?\*\/)/g, '')}
})();`;
        },
    };
}
