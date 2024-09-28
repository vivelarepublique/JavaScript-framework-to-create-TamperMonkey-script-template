<script lang="ts">
    import svelteLogo from '../assets/svg/svelte.svg';

    import Modal from './components/Modal.svelte';
    import { show, open } from './store/showStore';
</script>

<main>
    <button id="framework-test-svelte-modal" class="framework-test-modal-switch" on:click={open}>
        <span>More</span>
        <img src={svelteLogo} class="ft-button-logo" alt="Svelte logo" />
    </button>
    {#if $show}
        <Modal msg={'Welcome Svelte'} />
    {/if}
</main>

<style>
    #framework-test-svelte-modal {
        top: 50%;
        background-color: var(--ft-border-color-svelte);
    }
</style>
