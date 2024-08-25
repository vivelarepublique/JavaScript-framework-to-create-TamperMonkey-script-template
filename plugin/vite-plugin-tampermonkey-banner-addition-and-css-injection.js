import { getAllUniqueHostname, getAllUniqueGrant, getMultiParameters, getNewVersionId } from '../tools/banner.js';

export default function vitePluginTampermonkeyBannerAdditionAndCssInjection({ bannerConfig }) {
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const cssBundleNames = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));
            const jsBundleNames = Object.keys(bundle).filter(e => bundle[e].type == 'chunk' && bundle[e].fileName.endsWith('.js'));

            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');
            const js = jsBundleNames[0];

            const cssCode = cssBundleNames.reduce((accumulator, currentValue) => {
                const cssSource = bundle[currentValue].source instanceof Uint8Array ? new TextDecoder().decode(bundle[currentValue].source) : `${bundle[currentValue].source}`;
                delete bundle[currentValue];
                return accumulator + cssSource;
            }, '');

            const injectCss = css => /*javascript*/ `const vitePluginTampermonkeyTemplateCssInjection = document.createElement('style');${'\n'}vitePluginTampermonkeyTemplateCssInjection.appendChild(document.createTextNode(${JSON.stringify(css.trim())}));${'\n'}document.head.appendChild(vitePluginTampermonkeyTemplateCssInjection);`;

            const grants = Array.from(new Set(getAllUniqueGrant(bundle[js].code).concat(bannerConfig.grant)));
            const connects = Array.from(new Set(getAllUniqueHostname(bundle[js].code).concat(bannerConfig.connect)));
            const banner = `// ==UserScript==
// @name         ${bannerConfig.name}
// @namespace    ${bannerConfig.namespace}
// @version      ${getNewVersionId()}
// @description  ${bannerConfig.description}
// @author       ${bannerConfig.author}
// @run-at       ${bannerConfig.runtime}
${getMultiParameters(bannerConfig.matchUrl, 'match')}
${getMultiParameters(grants, 'grant')}
${getMultiParameters(connects, 'connect')}
// ==/UserScript==
`;
            bundle[js].code = /*javascript*/ `${banner}${'\n'}(function () {${'\n'}'use strict';${'\n'}${cssCode.length === 0 ? '' : injectCss(cssCode)}${'\n'}${bundle[js].code}${'\n'}})();`;
        },
    };
}
