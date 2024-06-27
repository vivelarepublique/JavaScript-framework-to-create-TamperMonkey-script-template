import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';

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
    plugins: [vue(), react(), svelte(), vitePluginTampermonkeyTemplate({ banner: config.banner })],
});
