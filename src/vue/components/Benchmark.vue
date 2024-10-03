<template>
    <div>
        <h1>Benchmark</h1>
        <p>Spend Time: {{ duration }} ms</p>
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
                <div v-for="ds in divList" :key="ds.id" class="col-1" :style="{ 'background-color': ds.backgroundColor, color: ds.color, fontSize: '8px' }">Div# {{ ds.id }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useBenchmarkStore } from '../store/benchmarkStore';

    import { measureRenderTime } from '../../common/components/benchmark';

    const benchMarkStore = useBenchmarkStore();
    const { divList } = storeToRefs(benchMarkStore);
    const { addRandomColorDiv, emptyRandomColorDiv } = benchMarkStore;

    const count = ref(0);
    const duration = ref(0);

    function updateDuration(time: number) {
        duration.value = time;
    }

    function _render() {
        measureRenderTime(addRandomColorDiv, count.value, updateDuration);
    }
</script>
