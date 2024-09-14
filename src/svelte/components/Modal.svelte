<script lang="ts">
    import type { ComponentType } from 'svelte';
    import VectorImage from './VectorImage.svelte';
    import Counter from './Counter.svelte';
    import WindowEvent from './WindowEvent.svelte';

    let currentView = 'VectorImage';
    const componentsMap: Record<string, ComponentType> = {
        VectorImage,
        Counter,
        WindowEvent,
    };

    import { show } from '../store/showStore';
    function close() {
        show.set(false);
    }
    export let msg;
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="framework-test-modal-mask" on:click|self|stopPropagation={close}>
        <div class="framework-test-modal-container">
            <span><button class="framework-test-modal-close-button" on:click={close}>&times;</button></span>
            <div class="container-fluid text-center">
                <div class="row">
                    <div class="col-2">
                        <p class="framework-test-header-svelte framework-test-heavy">{msg}</p>
                        <div class="btn-group-vertical" role="group">
                            <button type="button" class={currentView === 'VectorImage' ? 'btn btn-framework-test btn-framework-test-svelte' : 'btn btn-framework-test'} on:click={() => (currentView = 'VectorImage')}> Vector Image </button>
                            <button type="button" class={currentView === 'Counter' ? 'btn btn-framework-test btn-framework-test-svelte' : 'btn btn-framework-test'} on:click={() => (currentView = 'Counter')}> Counter </button>
                            <button type="button" class={currentView === 'WindowEvent' ? 'btn btn-framework-test btn-framework-test-svelte' : 'btn btn-framework-test'} on:click={() => (currentView = 'WindowEvent')}> Window Event </button>
                        </div>
                    </div>

                    <div class="col-8">
                        <svelte:component this={componentsMap[currentView]} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .btn-framework-test-svelte {
        color: #fff !important;
        background-color: #f96743 !important;
        border-color: #f96743 !important;
    }

    .btn-framework-test-svelte:hover,
    .btn-framework-test-svelte:active {
        color: #fff !important;
        background-color: #f9674366 !important;
        border-color: #f9674333 !important;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
    }
</style>
