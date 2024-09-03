<template>
    <div>
        <h1>Counter</h1>
        <p>Count: {{ count }}</p>
        <div class="framework-test-counter-row">
            <button class="framework-test-counter-button vue-counter-button" @click="increment">Increment</button>
            <button class="framework-test-counter-button vue-counter-button" @click="decrement">Decrement</button>
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
    .vue-counter-button {
        color: #42b883;
    }

    .framework-test-counter-button {
        appearance: none;
        background: none;
        font-size: 32px;
        padding: 0 12px;
        outline: none;
        border: 2px solid transparent;
        border-radius: 8px;
        padding-bottom: 4px;
        cursor: pointer;
        background-color: rgba(112, 76, 182, 0.1);
        transition: all 0.15s;
    }

    .framework-test-counter-row > .framework-test-counter-button {
        margin: 0 8px 0 4px;
    }

    .vue-counter-button:hover,
    .vue-counter-button:focus {
        border: 2px solid #42b88366;
    }

    .vue-counter-button:active {
        background-color: #42b88333;
    }
</style>
