import { Rollup } from 'vite';
import type { Plugin } from 'vite';
import { handlingCssFiles, cssSplitAndReorganize, extractCssOnDemand, componentsAnalysis, extractFileContentTagName, extractFileContentClassName } from '../tools/treeshaking';
import type { TreeShakingConfig } from '../types';

export default function cssBeautificationAndExternalCssTreeShakingPlugin(config: TreeShakingConfig): Plugin {
    const { cssFilesPath, frameworkComponentsPath } = config;
    return {
        name: 'vite-plugin-css-beautification-and-external-css-tree-shaking',
        apply: 'build',
        enforce: 'post',
        generateBundle(_options, bundle) {
            try {
                const fileInformation = handlingCssFiles(cssFilesPath);
                if (fileInformation.length === 0) return;

                const filesData = componentsAnalysis(frameworkComponentsPath);
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
