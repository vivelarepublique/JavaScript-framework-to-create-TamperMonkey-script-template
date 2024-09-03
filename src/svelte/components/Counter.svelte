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
        <button class="framework-test-counter-button svelte-counter-button" on:click={increment}>Increment</button>
        <button class="framework-test-counter-button svelte-counter-button" on:click={decrement}>Decrement</button>
    </div>
</div>

<style>
    .svelte-counter-button {
        color: #f96743;
    }

    .framework-test-counter-button {
        appearance: none;
        background: none;
        font-size: 32px;
        padding: 0 12px;
        outline: none;
        border: 2px solid transparent;
        border-radius: 8px;
        padding-bottom: 4px;
        cursor: pointer;
        background-color: rgba(112, 76, 182, 0.1);
        transition: all 0.15s;
    }

    .framework-test-counter-row > .framework-test-counter-button {
        margin: 0 8px 0 4px;
    }

    .svelte-counter-button:hover,
    .svelte-counter-button:focus {
        border: 2px solid #f9674366;
    }

    .svelte-counter-button:active {
        background-color: #f9674333;
    }
</style>
