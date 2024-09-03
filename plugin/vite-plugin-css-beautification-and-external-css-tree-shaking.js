import { cssSplitAndReorganize, extractCssOnDemand, componentsAnalysis, extractFileContentTagName, extractFileContentClassName } from '../tools/treeshaking.js';

export default function vitePluginCssBeautificationAndExternalCssTreeShaking(config) {
    const { cssPath = 'node_modules/bootstrap/dist/css/bootstrap.min.css', componentsPaths = ['vue', 'react', 'preact', 'lit', 'svelte', 'solid'] } = config || {};
    return {
        name: 'vite-plugin-css-beautification-and-sort',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const filesData = componentsAnalysis(componentsPaths);
            const minExternalCss = extractCssOnDemand(cssPath, extractFileContentTagName(filesData), extractFileContentClassName(filesData));
            if (minExternalCss.length === 0) return;

            const cssBundleNames = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));
            const lastCssBundleName = cssBundleNames[cssBundleNames.length - 1];

            const finalCss = [...cssSplitAndReorganize(bundle[lastCssBundleName].source, true), ...minExternalCss];
            bundle[lastCssBundleName].source = [...new Set(finalCss.filter(e => e && e.length > 1).map(e => e.trim()))].join('\n');
        },
    };
}
