import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSwitcherStore = defineStore('switcher', () => {
    const show = ref(false);
    function open() {
        show.value = true;
    }

    function close() {
        show.value = false;
    }

    return { show, close, open };
});
