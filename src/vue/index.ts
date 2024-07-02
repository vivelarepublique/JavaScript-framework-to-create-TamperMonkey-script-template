import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';

export function createVueApp() {
    createApp(App).use(createPinia()).mount('#vueApp');
}
