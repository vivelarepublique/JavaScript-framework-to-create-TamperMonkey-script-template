import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

import preact from '@preact/preset-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import solid from 'vite-plugin-solid';

import vitePluginCssBeautificationAndSort from './plugin/vite-plugin-css-beautification-and-sort.js';
import vitePluginTampermonkeyBannerAdditionAndCssInjection from './plugin/vite-plugin-tampermonkey-banner-addition-and-css-injection.js';

import { bannerConfig } from './config/getParameters.js';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: 'release',
        assetsInlineLimit: 4 * 1024 * 1024,
        minify: 'terser',
        terserOptions: {
            compress: true,
            mangle: false,
            format: {
                beautify: true,
            },
        },
        rollupOptions: {
            input: './src/index.ts',
            output: {
                entryFileNames: `${bannerConfig.name}.user.js`,
            },
        },
    },
    plugins: [
        vue(),
        react({
            include: ['src/react/*.{tsx,ts,jsx,js}', 'src/react/**/*.{tsx,ts,jsx,js}'],
        }),
        preact({
            include: ['src/preact/*.{tsx,ts,jsx,js}', 'src/preact/**/*.{tsx,ts,jsx,js}'],
        }),
        svelte({
            include: ['src/svelte/*.{tsx,ts,jsx,js,svelte}', 'src/svelte/**/*.{tsx,ts,jsx,js,svelte}'],
        }),
        solid({
            include: ['src/solid/*.{tsx,ts,jsx,js}', 'src/solid/**/*.{tsx,ts,jsx,js}'],
        }),
        vitePluginCssBeautificationAndSort(),
        vitePluginTampermonkeyBannerAdditionAndCssInjection({ bannerConfig }),
    ],
});
