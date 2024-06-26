import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';


export function createVueApp() {
    const app = createApp(App);
    const pinia = createPinia();
    app.use(pinia);
    app.mount('#vueApp');
}