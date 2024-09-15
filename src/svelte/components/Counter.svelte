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
    <div class="container text-center">
        <div class="row align-items-center">
            <div class="col-4"></div>
            <div class="col-2"><button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={increment}>Increment</button></div>
            <div class="col-2"><button type="button" class="btn btn-lg btn-framework-test-svelte" on:click={decrement}>Decrement</button></div>
            <div class="col-4"></div>
        </div>
    </div>
</div>
