<template>
    <div>
        <h1>Bridge</h1>
        <p>Value: {{ sharedState.search }}</p>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';

    const sharedState = reactive({
        //@ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    });
    onMounted(() => {
        unsafeWindow.addEventListener('kwChangedForVue', () => {
            //@ts-ignore
            sharedState.search = unsafeWindow.scriptTemplate?.search || '';
        });
    });
</script>
