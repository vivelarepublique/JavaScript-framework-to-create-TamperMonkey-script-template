<template>
    <div>
        <h1>Bridge</h1>
        <p>Value: {{ sharedState.search }}</p>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';

    import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

    const sharedState = reactive({
        //@ts-ignore
        search: windowProxy.scriptTemplate?.search || '',
    });
    onMounted(() => {
        windowProxy.addEventListener('kwChanged', () => {
            //@ts-ignore
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>
