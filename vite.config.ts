import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

import preact from '@preact/preset-vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import solid from 'vite-plugin-solid';

import linkCssTreeShaking from './plugin/vite-plugin-link-css-tree-shaking';
import tampermonkeyBannerAdditionAndCssInjection from './plugin/vite-plugin-tampermonkey-banner-addition-and-css-injection';

import { visualizer } from 'rollup-plugin-visualizer';

import { bannerConfig, supportedFramework } from './config/getParameters';

export default defineConfig(({ command, mode }) => {
    const isBuild = command === 'build';
    const isProduction = mode === 'production';

    const buildPlugins: PluginOption[] = isBuild
        ? [
              linkCssTreeShaking({
                  //   manualEntry: 'node_modules/bulma/css/bulma.min.css',
                  componentsFilesPath: supportedFramework.map(framework => `src/${framework}/components`),
              }),
              tampermonkeyBannerAdditionAndCssInjection({ bannerConfig }),
          ].concat(
              isProduction
                  ? [
                        visualizer({
                            emitFile: true,
                            filename: 'stats.html',
                        }),
                    ]
                  : [],
          )
        : [];

    return {
        css: {
            preprocessorOptions: {
                less: { math: 'parens-division' },
                sass: { api: 'modern' },
            },
        },
        server: {
            port: 5267,
        },
        build: {
            target: 'esnext',
            outDir: 'release',
            assetsInlineLimit: 16384,
            chunkSizeWarningLimit: 2048,
            minify: 'terser',
            terserOptions: {
                compress: true,
                mangle: true,
                format: { beautify: !isProduction },
            },
            rollupOptions: {
                input: './src/index.ts',
                output: { entryFileNames: `${bannerConfig.name}.user.js` },
            },
        },
        plugins: [
            vue(),
            react({
                include: ['src/react/**/*.{tsx,ts,jsx,js}'],
            }),
            preact({
                include: ['src/preact/**/*.{tsx,ts,jsx,js}'],
            }),
            svelte({
                preprocess: vitePreprocess(),
            }),
            solid({
                include: ['src/solid/**/*.{tsx,ts,jsx,js}'],
            }),
            ...buildPlugins,
        ],
    };
});
