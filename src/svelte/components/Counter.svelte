<script lang="ts">
    import { count } from '../store/counterStore';
    function increment() {
        count.update(n => n + 1);
    }
    function decrement() {
        count.update(n => n - 1);
    }
</script>

<div>
    <h1>Counter</h1>
    <p>Count: {$count}</p>
    <div class="framework-test-counter-row">
        <button class="framework-test-counter-button framework-test-counter-button-svelte" on:click={increment}>Increment</button>
        <button class="framework-test-counter-button framework-test-counter-button-svelte" on:click={decrement}>Decrement</button>
    </div>
</div>

<style>
    .framework-test-counter-button-svelte {
        color: #f96743;
    }

    .framework-test-counter-button-svelte:hover,
    .framework-test-counter-button-svelte:focus {
        border: 2px solid #f9674366;
    }

    .framework-test-counter-button-svelte:active {
        background-color: #f9674333;
    }
</style>
