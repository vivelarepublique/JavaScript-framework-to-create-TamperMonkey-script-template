<template>
    <div>
        <h1>Window Event Test</h1>
        <p>Value: {{ sharedState.search }}</p>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';

    import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

    const sharedState = reactive({
        search: windowProxy.scriptTemplate?.search || '',
    });
    onMounted(() => {
        windowProxy.addEventListener('kwChanged', () => {
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>
