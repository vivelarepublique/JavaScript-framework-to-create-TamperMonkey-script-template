import { Rollup, Plugin } from 'vite';
import { readFileInformation, cssFileTransformation, cssSplitAndReorganize, extractCssOnDemand, componentsAnalysis, extractFileContentTagName, extractFileContentClassName } from '../tools/treeshaking.js';
import { TreeShakingConfig } from '../types';

export default function vitePluginCssBeautificationAndExternalCssTreeShaking(config: TreeShakingConfig): Plugin {
    const { cssPath, componentsPaths = ['vue', 'react', 'preact', 'lit', 'svelte', 'solid'] } = config;
    return {
        name: 'vite-plugin-css-beautification-and-external-css-tree-shaking',
        apply: 'build',
        enforce: 'post',
        generateBundle(_options: Rollup.OutputOptions, bundle: { [fileName: string]: Rollup.OutputAsset | Rollup.OutputChunk }) {
            try {
                const file = readFileInformation(cssPath);
                const fileInformation = cssFileTransformation(file);
                if (fileInformation.length === 0) return;

                const filesData = componentsAnalysis(componentsPaths);
                const minExternalCss = extractCssOnDemand(fileInformation, extractFileContentTagName(filesData), extractFileContentClassName(filesData, 'framework-test'));

                const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
                const lastCssBundleName = cssBundleNames[cssBundleNames.length - 1];

                const finalCss = [...cssSplitAndReorganize((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string, true), ...minExternalCss];
                ((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string) = [...new Set(finalCss.filter(c => c && c.length > 1).map(c => c.trim()))].join('\n');
            } catch (error) {
                console.log(`Plugin [vite-plugin-css-beautification-and-external-css-tree-shaking] Error: ${error}`);
            }
        },
    };
}
