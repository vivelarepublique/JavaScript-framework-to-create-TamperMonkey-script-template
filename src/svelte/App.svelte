<script lang="ts">
    import Modal from './components/Modal.svelte';
    import { show } from './store/showStore';

    function open() {
        show.set(true);
    }
</script>

<main>
    <button id="framework-test-svelte-modal" class="framework-test-modal-switch" on:click={open}> Show Svelte Modal</button>
    {#if $show}
        <Modal msg={'Welcome Svelte'} />
    {/if}
</main>

<style>
    #framework-test-svelte-modal {
        left: 50%;
        background-color: var(--ft-color-svelte);
    }
</style>
