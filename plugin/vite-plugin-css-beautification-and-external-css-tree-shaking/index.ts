import { Rollup, type Plugin } from 'vite';
import treeShaking, { splitCssToArray } from './utilities';
import type { TreeShakingConfig } from './interfaces';

export default function cssBeautificationAndExternalCssTreeShakingPlugin(config: TreeShakingConfig): Plugin {
    const { cssFilesPath, frameworkComponentsPath } = config;
    return {
        name: 'vite-plugin-css-beautification-and-external-css-tree-shaking',
        apply: 'build',
        enforce: 'post',
        generateBundle(_options, bundle) {
            try {
                const minExternalCss = treeShaking({
                    cssFilesPath,
                    frameworkComponentsPath,
                    excludeTags: ['main', 'style', 'link', 'script', 'number', 'string', 'boolean', 'component', 'template', 'symbol', 'function', 'object', 'undefined'],
                    excludeClassNameKeywords: 'framework-test',
                });

                const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
                const lastCssBundleName = cssBundleNames[cssBundleNames.length - 1];

                const finalCss = [...splitCssToArray((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string, true), ...minExternalCss];
                ((bundle[lastCssBundleName] as Rollup.OutputAsset).source as string) = [...new Set(finalCss.filter(c => c && c.length > 1).map(c => c.trim()))].join('\n');
            } catch (error) {
                console.log(`Plugin [vite-plugin-css-beautification-and-external-css-tree-shaking] Error: ${error}`);
            }
        },
    };
}
