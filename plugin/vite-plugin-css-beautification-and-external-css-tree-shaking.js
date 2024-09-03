import { cssSplitAndReorganize, extractCssOnDemand, componentsAnalysis, extractFileContentTagName, extractFileContentClassName } from '../tools/treeshaking.js';

export default function vitePluginCssBeautificationAndExternalCssTreeShaking(config) {
    const { cssPath = 'node_modules/bootstrap/dist/css/bootstrap.min.css', componentsPaths = ['vue', 'react', 'preact', 'lit', 'svelte', 'solid'] } = config || {};
    return {
        name: 'vite-plugin-css-beautification-and-sort',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const filesData = componentsAnalysis(componentsPaths);
            const tags = extractFileContentTagName(filesData);
            const classes = extractFileContentClassName(filesData);
            const minExternalCss = extractCssOnDemand(cssPath, tags, classes);

            const cssBundleNames = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));
            cssBundleNames.forEach(css => {
                const beautifulCss = [...cssSplitAndReorganize(bundle[css].source, true), ...minExternalCss];

                bundle[css].source = [...new Set(beautifulCss.filter(e => e && e.length > 1).map(e => e.trim()))].join('\n');
            });
        },
    };
}
