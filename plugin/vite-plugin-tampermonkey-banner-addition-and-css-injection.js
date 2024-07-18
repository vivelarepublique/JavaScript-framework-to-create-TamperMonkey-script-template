
export default function vitePluginTampermonkeyBannerAdditionAndCssInjection({ banner }) {
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const cssBundleNames = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));
            const jsBundleNames = Object.keys(bundle).filter(e => bundle[e].type == 'chunk' && bundle[e].fileName.endsWith('.js'));

            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');

            const cssCode = cssBundleNames.reduce((accumulator, currentValue) => {
                const cssSource = bundle[currentValue].source instanceof Uint8Array ? new TextDecoder().decode(bundle[currentValue].source) : `${bundle[currentValue].source}`;
                delete bundle[currentValue];
                return accumulator + cssSource;
            }, '');

            if (cssCode.length === 0) return null;

            const injectCss = cssCode => /*javascript*/ `const vitePluginTampermonkeyTemplateCssInjection = document.createElement('style');${'\n'}vitePluginTampermonkeyTemplateCssInjection.appendChild(document.createTextNode(${JSON.stringify(cssCode.trim())}));${'\n'}document.head.appendChild(vitePluginTampermonkeyTemplateCssInjection);`;

            jsBundleNames.forEach(js => {
                bundle[js].code = /*javascript*/ `${banner}${'\n'}(function () {${'\n'}'use strict';${'\n'}${injectCss(cssCode)}${'\n'}${bundle[js].code}${'\n'}})();`;
            });
        },
    };
}
