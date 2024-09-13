import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import './index.css';

export function createVue(target: HTMLElement) {
    createApp(App).use(createPinia()).mount(target);
}
