import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useShowStore = defineStore('show', () => {
    const show = ref(false);

    function open() {
        show.value = true;
    }

    function close() {
        show.value = false;
    }

    return { show, close, open };
});
