<template>
    <div>
        <h1>Counter</h1>
        <p>Count: {{ count }}</p>
        <div class="framework-test-counter-row">
            <button class="framework-test-counter-button framework-test-counter-button-vue" @click="increment">Increment</button>
            <button class="framework-test-counter-button framework-test-counter-button-vue" @click="decrement">Decrement</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useCounterStore } from '../store/counterStore';

    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);
    const { increment, decrement } = counterStore;
</script>

<style>
    .framework-test-counter-button-vue {
        color: #42b883;
    }

    .framework-test-counter-button-vue:hover,
    .framework-test-counter-button-vue:focus {
        border: 2px solid #42b88366;
    }

    .framework-test-counter-button-vue:active {
        background-color: #42b88333;
    }
</style>
