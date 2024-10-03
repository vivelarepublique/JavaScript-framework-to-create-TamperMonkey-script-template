import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

import preact from '@preact/preset-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import solid from 'vite-plugin-solid';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import cssBeautificationAndExternalCssTreeShaking from './plugin/vite-plugin-css-beautification-and-external-css-tree-shaking';
import tampermonkeyBannerAdditionAndCssInjection from './plugin/vite-plugin-tampermonkey-banner-addition-and-css-injection';

import { visualizer } from 'rollup-plugin-visualizer';

import { bannerConfig } from './config/getParameters';

export default defineConfig(({ command, mode }) => {
    const isBuild = command === 'build';
    const isProduction = mode === 'production';

    const buildPlugins: PluginOption[] = isBuild
        ? [
              cssBeautificationAndExternalCssTreeShaking({
                  cssPath: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                  framework: ['vue', 'react', 'preact', 'lit', 'svelte', 'solid'],
              }),
              tampermonkeyBannerAdditionAndCssInjection({ bannerConfig }),
          ].concat(
              isProduction
                  ? []
                  : [
                        visualizer({
                            emitFile: true,
                            filename: 'stats.html',
                        }),
                    ],
          )
        : [];

    return {
        css: {
            preprocessorOptions: {
                less: { math: 'parens-division' },
                sass: { api: 'modern' },
                stylus: {},
            },
        },
        server: {
            port: 5267,
        },
        build: {
            target: 'esnext',
            outDir: 'release',
            assetsInlineLimit: 4096 * 1024,
            chunkSizeWarningLimit: 2048 * 1024,
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
                include: ['src/svelte/**/*.{tsx,ts,jsx,js,svelte}'],
                preprocess: vitePreprocess(),
            }),
            solid({
                include: ['src/solid/**/*.{tsx,ts,jsx,js}'],
            }),
            ...buildPlugins,
        ],
    };
});
