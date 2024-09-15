<template>
    <div>
        <h1>Counter</h1>
        <p>Count: {{ count }}</p>
        <div class="container text-center">
            <div class="row align-items-center">
                <div class="col-4"></div>
                <div class="col-2"><button type="button" class="btn btn-lg btn-framework-test-vue" @click="increment">Increment</button></div>
                <div class="col-2"><button type="button" class="btn btn-lg btn-framework-test-vue" @click="decrement">Decrement</button></div>
                <div class="col-4"></div>
            </div>
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
