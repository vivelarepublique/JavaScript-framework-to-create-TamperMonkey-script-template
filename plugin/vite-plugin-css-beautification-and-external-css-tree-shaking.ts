import { Rollup, Plugin } from 'vite';
import { cssSplitAndReorganize, extractCssOnDemand, componentsAnalysis, extractFileContentTagName, extractFileContentClassName } from '../tools/treeshaking.js';
import { TreeShakingConfig } from '../types';

export default function vitePluginCssBeautificationAndExternalCssTreeShaking(config: TreeShakingConfig): Plugin {
    const { cssPath, componentsPaths = ['vue', 'react', 'preact', 'lit', 'svelte', 'solid'] } = config;
    return {
        name: 'vite-plugin-css-beautification-and-external-css-tree-shaking',
        apply: 'build',
        enforce: 'post',
        generateBundle(_: Rollup.OutputOptions, bundle: { [fileName: string]: Rollup.OutputAsset | Rollup.OutputChunk }) {
            const filesData = componentsAnalysis(componentsPaths);
            const minExternalCss = extractCssOnDemand(cssPath, extractFileContentTagName(filesData), extractFileContentClassName(filesData));
            if (minExternalCss.length === 0) return;

            const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
            const lastCssBundleName = cssBundleNames[cssBundleNames.length - 1];

            const finalCss = [...cssSplitAndReorganize((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string, true), ...minExternalCss];
            ((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string) = [...new Set(finalCss.filter(c => c && c.length > 1).map(c => c.trim()))].join('\n');
        },
    };
}
