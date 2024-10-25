import { Rollup, type Plugin } from 'vite';
import { cssTemplate, bannerTemplate, jsTemplate, splitCssToArray } from './utilities';
import type { PluginOption } from './interfaces';

export default function tampermonkeyBannerAdditionAndCssInjectionPlugin(config: PluginOption): Plugin {
    const { bannerConfig, beautifulCss } = config;
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        async generateBundle(_options, bundle) {
            const jsBundleNames = Object.keys(bundle).filter(b => bundle[b].type == 'chunk' && bundle[b].fileName.endsWith('.js'));
            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');
            const entry = bundle[jsBundleNames[0]] as Rollup.OutputChunk;

            const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
            const allCss = cssBundleNames.reduce((accumulator, current) => {
                const cssSource = (bundle[current] as Rollup.OutputAsset).source;
                delete bundle[current];
                return accumulator + cssSource;
            }, '');

            const cssCode = allCss.length === 0 ? '' : await cssTemplate(beautifulCss ? splitCssToArray(allCss).join('\n') : allCss, 'tampermonkeyTemplateCssInjection');
            const banner = bannerTemplate(entry.code, bannerConfig);
            entry.code = jsTemplate(banner, cssCode, entry.code);
        },
    };
}
