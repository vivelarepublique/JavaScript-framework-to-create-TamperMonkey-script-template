<template>
    <div>
        <h1>Counter</h1>
        <p>Count: {{ count }}</p>
        <p>Double Count: {{ doubleCount }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../store/counter';
const counter = useCounterStore();
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;
</script>
