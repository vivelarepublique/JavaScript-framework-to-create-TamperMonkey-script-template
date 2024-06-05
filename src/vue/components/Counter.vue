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
    import { useCounterStore } from '../store/counter';
    const counter = useCounterStore();
    const { count } = storeToRefs(counter);
    const { increment, decrement } = counter;
</script>

<style>
    @import '../css/counter.css';
</style>
