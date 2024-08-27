export default function vitePluginCssBeautificationAndSort() {
    return {
        name: 'vite-plugin-css-beautification-and-sort',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            const cssBundleNames = Object.keys(bundle).filter(e => bundle[e].type === 'asset' && bundle[e].fileName.endsWith('.css'));
            cssBundleNames.forEach(css => {
                const cssArray = bundle[css].source.split('}');
                const cssResult = [];
                for (let i = 0; i < cssArray.length; i++) {
                    if (cssArray[i].includes('@')) {
                        cssResult.push(cssArray[i] + '}' + cssArray[i + 1] + '}}');
                        i = i + 2;
                    } else {
                        cssResult.push(cssArray[i] + '}');
                    }
                }
                bundle[css].source = [
                    ...new Set(
                        cssResult
                            .map(e => e.trim())
                            .sort()
                            .filter(e => e && e.length > 1),
                    ),
                ].join('\n');
            });
        },
    };
}
