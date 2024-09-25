<template>
    <div>
        <h1>Counter</h1>
        <div class="alert alert-dark" role="alert">Count: {{ count }}</div>
        <div class="container text-center">
            <div class="row align-items-end">
                <div class="col-2">
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="increment">Increment</button>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="decrement">Decrement</button>
                </div>
                <div class="col-4">
                    <div class="input-group">
                        <input type="number" class="form-control" placeholder="Amount" v-model="amount" />
                        <button type="button" class="btn btn-lg btn-framework-test-vue" @click="incrementByAmount(amount)">Increment By Amount</button>
                    </div>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="doubleCount">Double Count</button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="reset">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useCounterStore } from '../store/counterStore';

    const counterStore = useCounterStore();
    const { count } = storeToRefs(counterStore);
    const { increment, decrement, incrementByAmount, doubleCount, reset } = counterStore;

    const amount = ref(0);
</script>
