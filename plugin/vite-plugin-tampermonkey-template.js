import { build } from 'vite';

const cssInjectedByJsId = '\0vite/all-css';
async function buildCSSInjectionCode({ buildOptions, css }) {
    const { minify, target } = buildOptions;
    const res = await build({
        root: '',
        configFile: false,
        plugins: [injectionCSSCodePlugin({ css })],
        build: {
            write: false,
            target,
            minify,
            terserOptions: {
                compress: false,
                mangle: false,
                format: {
                    beautify: true,
                },
            },
            assetsDir: '',
            rollupOptions: {
                input: {
                    ['all-css']: cssInjectedByJsId,
                },
            },
        },
    });
    const _cssChunk = Array.isArray(res) ? res[0] : res;
    if (!('output' in _cssChunk)) return null;
    return _cssChunk.output[0];
}

function injectionCSSCodePlugin({ css }) {
    return {
        name: 'vite:injection-css-code-plugin',
        resolveId(id) {
            if (id === cssInjectedByJsId) {
                return id;
            }
        },
        load(id) {
            if (id === cssInjectedByJsId) {
                const cssCode = JSON.stringify(css.trim());
                const injectFunction = cssCode => /*javascript*/ `const otherCss = document.createElement('style');
                    otherCss.appendChild(document.createTextNode(${cssCode}));
                    document.head.appendChild(otherCss);`;
                return injectFunction(cssCode);
            }
        },
    };
}

async function globalCssInjection(bundle, cssAssets, buildCssCode, banner) {
    const jsTargetBundleKeys = Object.keys(bundle).filter(e => bundle[e].type == 'chunk' && bundle[e].isEntry && bundle[e].fileName.match(/.[cm]?js(?:\?.+)?$/) != null);

    if (jsTargetBundleKeys.length === 0) throw new Error('No entry point found');

    const allCssCode = cssAssets.reduce((accumulator, currentValue) => {
        const cssSource = bundle[currentValue].source instanceof Uint8Array ? new TextDecoder().decode(bundle[currentValue].source) : `${bundle[currentValue].source}`;
        delete bundle[currentValue];
        return accumulator + cssSource;
    }, '');

    if (allCssCode.length === 0) return null;

    const cssCode = (await buildCssCode(allCssCode))?.code;

    jsTargetBundleKeys.forEach(js => {
        bundle[js].code = /*javascript*/ `${banner}${'\n'}(function () {${'\n'}'use strict';${'\n'}${cssCode}${'\n'}${bundle[js].code}${'\n'}})();`;
    });
}

export default function plugin({ banner }) {
    const viteConfig = {
        config: null,
    };
    return [
        {
            apply: 'build',
            enforce: 'post',
            name: 'vite-plugin-tampermonkey-template',
            configResolved(resolvedConfig) {
                viteConfig.config = resolvedConfig;
            },
            async generateBundle(_, bundle) {
                const buildCssCode = css =>
                    buildCSSInjectionCode({
                        buildOptions: viteConfig.config.build,
                        css,
                    });
                const cssAssets = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));

                await globalCssInjection(bundle, cssAssets, buildCssCode, banner);
            },
        },
    ];
}
