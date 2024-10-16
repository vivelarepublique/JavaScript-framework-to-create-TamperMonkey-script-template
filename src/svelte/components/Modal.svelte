<script lang="ts">
    import type { ComponentType } from 'svelte';
    import VectorImage from './VectorImage.svelte';
    import Counter from './Counter.svelte';
    import WindowEvent from './WindowEvent.svelte';
    import Benchmark from './Benchmark.svelte';

    let currentView = 'VectorImage';
    const componentsMap: Record<string, ComponentType> = {
        VectorImage,
        Counter,
        WindowEvent,
        Benchmark,
    };

    import { close } from '../store/showStore';

    export let msg;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<main>
    <div class="framework-test-modal-mask" on:click|self|stopPropagation={close}>
        <div class="framework-test-modal-container">
            <span><button class="framework-test-modal-close-button" on:click={close}>&times;</button></span>

            <div class="block">
                <div class="title is-1 header-framework-test-svelte">{msg}</div>
                <div class="tabs is-centered is-toggle is-toggle-rounded">
                    <ul>
                        <li>
                            <button class={currentView === 'VectorImage' ? 'button button-framework-test-svelte' : 'button'} on:click={() => (currentView = 'VectorImage')}> Vector Image </button>
                        </li>
                        <li>
                            <button class={currentView === 'Counter' ? 'button button-framework-test-svelte' : 'button'} on:click={() => (currentView = 'Counter')}> Counter </button>
                        </li>
                        <li>
                            <button class={currentView === 'WindowEvent' ? 'button button-framework-test-svelte' : 'button'} on:click={() => (currentView = 'WindowEvent')}> Window Event </button>
                        </li>
                        <li>
                            <button class={currentView === 'Benchmark' ? 'button button-framework-test-svelte' : 'button'} on:click={() => (currentView = 'Benchmark')}> Benchmark </button>
                        </li>
                    </ul>
                </div>
                <svelte:component this={componentsMap[currentView]} />
            </div>
        </div>
    </div>
</main>
