import { Rollup, type Plugin } from 'vite';
import treeShaking, { splitCssToArray, removeDuplicates } from './utilities';
import type { TreeShakingOptions } from './interfaces';

export default function linkCssTreeShakingPlugin(config: TreeShakingOptions): Plugin {
    const { manualEntry, componentsFilesPath, excludeTags, excludeClassNameKeywords } = config;
    return {
        name: 'vite-plugin-link-css-tree-shaking',
        apply: 'build',
        enforce: 'post',
        async generateBundle(_options, bundle) {
            try {
                const minLinkCss = await treeShaking({
                    manualEntry,
                    componentsFilesPath,
                    excludeTags: excludeTags || ['main', 'style', 'link', 'script', 'number', 'string', 'boolean', 'component', 'template', 'symbol', 'function', 'object', 'undefined'],
                    excludeClassNameKeywords: excludeClassNameKeywords || 'framework-test',
                });

                const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
                const lastCssBundleName = cssBundleNames[cssBundleNames.length - 1];
                const lastCssBundle = bundle[lastCssBundleName] as Rollup.OutputAsset;

                const finalCss = [...splitCssToArray(lastCssBundle.source as string, true), ...minLinkCss];
                (lastCssBundle.source as string) = removeDuplicates(finalCss.filter(c => c && c.length > 1).map(c => c.trim())).join('\n');
            } catch (error) {
                console.log(`Plugin [vite-plugin-link-css-tree-shaking] Error: ${error}`);
            }
        },
    };
}
