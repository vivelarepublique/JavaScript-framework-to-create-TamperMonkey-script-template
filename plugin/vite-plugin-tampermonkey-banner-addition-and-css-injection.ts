import { Rollup, Plugin } from 'vite';
import { getAllUniqueHostname, getAllUniqueGrant, getMultiParameters, getNewVersionId } from '../tools/banner.js';
import { ScriptInformationParameters } from '../types';

export default function vitePluginTampermonkeyBannerAdditionAndCssInjection({ bannerConfig }: { bannerConfig: ScriptInformationParameters }): Plugin {
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        generateBundle(_: Rollup.OutputOptions, bundle: { [fileName: string]: Rollup.OutputAsset | Rollup.OutputChunk }) {
            const jsBundleNames = Object.keys(bundle).filter(b => bundle[b].type == 'chunk' && bundle[b].fileName.endsWith('.js'));
            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');
            const firstJsBundleName = jsBundleNames[0];

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

            const grants = Array.from(new Set(getAllUniqueGrant((bundle[firstJsBundleName] as Rollup.OutputChunk).code).concat(bannerConfig.grant)));
            const connects = Array.from(new Set(getAllUniqueHostname((bundle[firstJsBundleName] as Rollup.OutputChunk).code).concat(bannerConfig.connect)));
            const banner = `// ==UserScript==
// @name         ${bannerConfig.name}
// @namespace    ${bannerConfig.namespace}
// @version      ${bannerConfig.version || getNewVersionId()}
// @description  ${bannerConfig.description}
// @author       ${bannerConfig.author}
// @run-at       ${bannerConfig.runtime}
${getMultiParameters(bannerConfig.matchUrl, 'match')}
${getMultiParameters(grants, 'grant')}
${getMultiParameters(connects, 'connect')}
// ==/UserScript==
`;
            (bundle[firstJsBundleName] as Rollup.OutputChunk).code = /*javascript*/ `${banner}
(function () {
'use strict';
${allCssCode.length === 0 ? '' : injectCss(allCssCode)}
${(bundle[firstJsBundleName] as Rollup.OutputChunk).code.replace(/(\/\*[\s\S]*?\*\/)/g, '')}
})();`;
        },
    };
}
