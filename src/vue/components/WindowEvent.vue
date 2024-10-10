<template>
    <div class="block">
        <div class="subtitle is-2 header-framework-test-vue">Window Event, Value is {{ sharedState.search }}</div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';

    import { windowProxy } from '../../common/utils/tamperMonkeyFunction';

    const sharedState = reactive({
        search: windowProxy.scriptTemplate?.search || '',
    });
    onMounted(() => {
        windowProxy.addEventListener('kwChanged', () => {
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>
