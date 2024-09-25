<script lang="ts">
    import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../store/counterStore';
    let amount = 0;

    function handleAmountInput(event: Event) {
        const input = event.target as HTMLInputElement;
        amount = parseInt(input.value);
    }
</script>

<div>
    <h1>Counter</h1>
    <div class="alert alert-dark" role="alert">Count: {$count}</div>
    <div class="container text-center">
        <div class="row align-items-end">
            <div class="col-2">
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={increment}>Increment</button>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={decrement}>Decrement</button>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <input type="number" class="form-control" placeholder="Amount" bind:value={amount} on:input={handleAmountInput} />
                    <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={() => incrementByAmount(amount)}>Increment By Amount</button>
                </div>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={doubleCount}>Double Count</button>
            </div>
            <div class="col-1">
                <button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={reset}>Reset</button>
            </div>
        </div>
    </div>
</div>
