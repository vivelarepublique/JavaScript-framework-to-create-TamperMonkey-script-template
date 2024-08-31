<template>
    <div>
        <h1>Counter</h1>
        <p>Count: {{ count }}</p>
        <div class="vue-counter-row">
            <button class="vue-counter-button" @click="increment">Increment</button>
            <button class="vue-counter-button" @click="decrement">Decrement</button>
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
        appearance: none;
        background: none;
        font-size: 32px;
        padding-left: 12px;
        padding-right: 12px;
        outline: none;
        border: 2px solid transparent;
        color: #42b883;
        padding-bottom: 4px;
        cursor: pointer;
        background-color: rgba(112, 76, 182, 0.1);
        border-radius: 2px;
        transition: all 0.15s;
    }

    .vue-counter-row > .vue-counter-button {
        margin-left: 4px;
        margin-right: 8px;
    }

    .vue-counter-button:hover,
    .vue-counter-button:focus {
        border: 2px solid #42b88366;
    }

    .vue-counter-button:active {
        background-color: #42b88333;
    }
</style>
../store/counterStore
