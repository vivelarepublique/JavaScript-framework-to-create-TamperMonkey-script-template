<script lang="ts">
    import Modal from './components/Modal.svelte';
    import { show } from './store';

    function open() {
        show.update(_ => true);
    }
</script>

<main>
    <button id="svelte-modal" on:click={open}> Show Svelte Modal</button>
    {#if $show}
        <Modal />
    {/if}
</main>

<style>
    #svelte-modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        animation: anime-svelte 0.25s;
        padding: 10px 20px;
        margin: 5px 10px;
        border: none;
        background-color: #f96743;
        color: white;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
