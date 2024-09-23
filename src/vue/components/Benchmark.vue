<template>
    <div>
        <h1>Benchmark</h1>
        <p>Spend Time: {{ endTime - startTime }} ms</p>
        <div class="container text-center">
            <div class="row align-items-center">
                <div class="input-group">
                    <span class="input-group-text">Render Number: </span>
                    <input type="number" class="form-control" placeholder="Input number of divs" v-model="count" />
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="_render">Render</button>
                    <button type="button" class="btn btn-lg btn-framework-test-vue" @click="emptyRandomColorDiv">Empty</button>
                </div>
            </div>
        </div>
        <div class="container text-center">
            <div class="row align-items-center">
                <div v-for="ds in _divs" :key="ds.id" class="col-1" :style="{ 'background-color': ds.backgroundColor, color: ds.color, fontSize: '8px' }">Div# {{ ds.id }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useBenchmarkStore } from '../store/benchmarkStore';

    const count = ref(0);
    const startTime = ref(0);
    const endTime = ref(0);

    function _render() {
        startTime.value = Date.now();
        addRandomColorDiv(count.value);
        endTime.value = Date.now();
    }

    const benchMarkStore = useBenchmarkStore();
    const { randomColorDiv: _divs } = storeToRefs(benchMarkStore);
    const { addRandomColorDiv, emptyRandomColorDiv } = benchMarkStore;
</script>
