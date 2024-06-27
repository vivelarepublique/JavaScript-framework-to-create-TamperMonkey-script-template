import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

import preact from '@preact/preset-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import solid from 'vite-plugin-solid';

import vitePluginTampermonkeyTemplate from './plugin/vite-plugin-tampermonkey-template.js';
import config from './config/calculatedParameters.js';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: 'release',
        assetsInlineLimit: 4 * 1024 * 1024,
        minify: 'terser',
        terserOptions: {
            compress: true,
            mangle: true,
            format: {
                beautify: true,
            },
        },
        rollupOptions: {
            input: './src/index.ts',
            output: {
                entryFileNames: config.scriptFilename,
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
        vitePluginTampermonkeyTemplate({ banner: config.banner }),
    ],
});
