import { build } from 'vite';

const cssInjectedByJsId = '\0vite/all-css';
async function buildCSSInjectionCode({ buildOptions, cssToInject }) {
    const { minify, target } = buildOptions;
    const res = await build({
        root: '',
        configFile: false,
        plugins: [injectionCSSCodePlugin({ cssToInject })],
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

function resolveInjectionCode(cssCode) {
    const injectFunction = cssCode => /*javascript*/ `const otherCss = document.createElement('style');
otherCss.appendChild(document.createTextNode(${cssCode}));
document.head.appendChild(otherCss);`;
    return injectFunction(cssCode);
}

function injectionCSSCodePlugin({ cssToInject }) {
    return {
        name: 'vite:injection-css-code-plugin',
        resolveId(id) {
            if (id == cssInjectedByJsId) {
                return id;
            }
        },
        load(id) {
            if (id == cssInjectedByJsId) {
                const cssCode = JSON.stringify(cssToInject.trim());
                return resolveInjectionCode(cssCode);
            }
        },
    };
}

function isJsOutputChunk(chunk) {
    return chunk.type == 'chunk' && chunk.fileName.match(/.[cm]?js(?:\?.+)?$/) != null;
}
function defaultJsAssetsFilter(chunk) {
    return chunk.isEntry && !chunk.fileName.includes('polyfill');
}

const cssSourceCache = {};
function extractCss(bundle, cssName) {
    const cssAsset = bundle[cssName];
    if (cssAsset !== undefined && cssAsset.source) {
        const cssSource = cssAsset.source;
        cssSourceCache[cssName] = cssSource instanceof Uint8Array ? new TextDecoder().decode(cssSource) : `${cssSource}`;
    }
    return cssSourceCache[cssName] ?? '';
}
function concatCssAndDeleteFromBundle(bundle, cssAssets) {
    return cssAssets.reduce((previous, cssName) => {
        const cssSource = extractCss(bundle, cssName);
        delete bundle[cssName];
        return previous + cssSource;
    }, '');
}

function getJsTargetBundleKeys(bundle) {
    const jsAssets = Object.keys(bundle).filter(i => {
        const asset = bundle[i];
        return isJsOutputChunk(asset) && defaultJsAssetsFilter(asset);
    });
    if (jsAssets.length == 0) {
        return [];
    }
    const jsTargetFileName = jsAssets[jsAssets.length - 1];
    return [jsTargetFileName];
}

const globalCSSCodeEntryCache = new Map();
let previousFacadeModuleId = '';
async function globalCssInjection(bundle, cssAssets, buildCssCode, banner) {
    const jsTargetBundleKeys = getJsTargetBundleKeys(bundle);
    if (jsTargetBundleKeys.length === 0) return;

    const allCssCode = concatCssAndDeleteFromBundle(bundle, cssAssets);
    let cssInjectionCode = '';
    if (allCssCode.length > 0) {
        const cssCode = (await buildCssCode(allCssCode))?.code;
        if (typeof cssCode == 'string') {
            cssInjectionCode = cssCode;
        }
    }
    for (const jsTargetKey of jsTargetBundleKeys) {
        const jsAsset = bundle[jsTargetKey];

        if (jsAsset.facadeModuleId != null && jsAsset.isEntry && cssInjectionCode != '') {
            if (jsAsset.facadeModuleId != previousFacadeModuleId) {
                globalCSSCodeEntryCache.clear();
            }
            previousFacadeModuleId = jsAsset.facadeModuleId;
            globalCSSCodeEntryCache.set(jsAsset.facadeModuleId, cssInjectionCode);
        }
        if (cssInjectionCode == '' && jsAsset.isEntry && jsAsset.facadeModuleId != null && typeof globalCSSCodeEntryCache.get(jsAsset.facadeModuleId) == 'string') {
            cssInjectionCode = globalCSSCodeEntryCache.get(jsAsset.facadeModuleId);
        }

        jsAsset.code = buildOutputChunkWithCssInjectionCode(jsAsset.code, cssInjectionCode ?? '', banner);
    }
}

function buildOutputChunkWithCssInjectionCode(jsAssetCode, cssInjectionCode, banner) {
    const appCode = jsAssetCode.replace(/\/\*\s*empty css\s*\*\//g, '');
    return /*javascript*/ `${banner}
(function () {
    'use strict';
    ${cssInjectionCode}
    ${appCode}
})();`;
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
            config(config, { command }) {
                if (command === 'build') {
                    if (!config.build) {
                        config.build = {};
                    }
                }
            },
            configResolved(resolvedConfig) {
                viteConfig.config = resolvedConfig;
            },
            async generateBundle(_, bundle) {
                if (viteConfig.config.build.ssr) {
                    return;
                }
                const buildCssCode = cssToInject =>
                    buildCSSInjectionCode({
                        buildOptions: viteConfig.config.build,
                        cssToInject,
                    });
                const cssAssets = Object.keys(bundle).filter(i => bundle[i].type == 'asset' && bundle[i].fileName.endsWith('.css'));

                await globalCssInjection(bundle, cssAssets, buildCssCode, banner);
            },
        },
    ];
}
