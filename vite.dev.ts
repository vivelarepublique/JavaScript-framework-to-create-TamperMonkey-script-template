import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';

import preact from '@preact/preset-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import solid from 'vite-plugin-solid';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
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
            preprocess: vitePreprocess(),
        }),
        solid({
            include: ['src/solid/*.{tsx,ts,jsx,js}', 'src/solid/**/*.{tsx,ts,jsx,js}'],
        }),
    ],
});
