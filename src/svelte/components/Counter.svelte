<script lang="ts">
    import { count } from '../store';
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
    <div class="svelte-counter-row">
        <button class="svelte-counter-button" on:click={increment}>Increment</button>
        <button class="svelte-counter-button" on:click={decrement}>Decrement</button>
    </div>
</div>

<style>
    .svelte-counter-button {
        appearance: none;
        background: none;
        font-size: 32px;
        padding-left: 12px;
        padding-right: 12px;
        outline: none;
        border: 2px solid transparent;
        color: #f96743;
        padding-bottom: 4px;
        cursor: pointer;
        background-color: rgba(112, 76, 182, 0.1);
        border-radius: 2px;
        transition: all 0.15s;
    }

    .svelte-counter-row > .svelte-counter-button {
        margin-left: 4px;
        margin-right: 8px;
    }

    .svelte-counter-button:hover,
    .svelte-counter-button:focus {
        border: 2px solid #f9674366;
    }

    .svelte-counter-button:active {
        background-color: #f9674333;
    }
</style>
