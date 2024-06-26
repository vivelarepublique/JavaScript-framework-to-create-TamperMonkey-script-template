import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import vitePluginTampermonkeyTemplate from './plugin/vite-plugin-tampermonkey-template.js';
import config from './config/info.js';

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
            input: './src/index.tsx',
            output: {
                entryFileNames: config.scriptFilename,
            },
        },
    },
    plugins: [react(), vue(), vitePluginTampermonkeyTemplate({ banner: config.banner })],
});
