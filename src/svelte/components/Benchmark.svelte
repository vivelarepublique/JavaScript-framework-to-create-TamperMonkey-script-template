<script lang="ts">
    import { divList, addRandomColorDiv, emptyRandomColorDiv } from '../store/benchmarkStore';
    import { measureRenderTime } from '../../common/benchmark';
    let count = 0;
    let duration = 0;

    function handleNumberInput(event: Event) {
        const input = event.target as HTMLInputElement;
        count = parseInt(input.value);
    }

    function _updateDuration(time: number) {
        duration = time;
    }

    async function _render() {
        measureRenderTime(addRandomColorDiv, count, _updateDuration);
    }
</script>

<div>
    <h1>Benchmark</h1>
    <p>Spend Time: {duration} ms</p>
    <div class="container text-center">
        <div class="row align-items-center">
            <div class="input-group">
                <span class="input-group-text">Render Number:</span>
                <input type="number" class="form-control" placeholder="Input number of divList" bind:value={count} on:input={handleNumberInput} />
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={_render}> Render </button>
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={emptyRandomColorDiv}> Empty </button>
            </div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-center">
            {#each $divList as ds (ds.id)}
                <div class="col-1" style="background-color: {ds.backgroundColor}; color: {ds.color}; font-size: 8px;">Div# {ds.id}</div>
            {/each}
        </div>
    </div>
</div>
