import { Rollup, type Plugin } from 'vite';
import { cssTemplate, bannerTemplate, jsTemplate } from './utilities';
import type { ScriptInformationParameters } from './types';

export default function tampermonkeyBannerAdditionAndCssInjectionPlugin({ bannerConfig }: { bannerConfig: ScriptInformationParameters }): Plugin {
    return {
        name: 'vite-plugin-tampermonkey-banner-addition-and-css-injection',
        apply: 'build',
        enforce: 'post',
        async generateBundle(_options, bundle) {
            const jsBundleNames = Object.keys(bundle).filter(b => bundle[b].type == 'chunk' && bundle[b].fileName.endsWith('.js'));
            if (jsBundleNames.length != 1) throw new Error('There should be exactly one js bundle');
            const entry = bundle[jsBundleNames[0]] as Rollup.OutputChunk;

            const cssBundleNames = Object.keys(bundle).filter(b => bundle[b].type === 'asset' && bundle[b].fileName.endsWith('.css'));
            const allCssCode = cssBundleNames.reduce((accumulator, current) => {
                const cssSource = (bundle[current] as Rollup.OutputAsset).source;
                delete bundle[current];
                return accumulator + cssSource;
            }, '');

            const cssCode = allCssCode.length === 0 ? '' : await cssTemplate(allCssCode, 'tampermonkeyTemplateCssInjection');
            const banner = bannerTemplate(entry.code, bannerConfig);
            entry.code = jsTemplate(banner, cssCode, entry.code);
        },
    };
}
