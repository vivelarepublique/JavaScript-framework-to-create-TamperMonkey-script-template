<script lang="ts">
    import Test from './Test.svelte';
    import Counter from './Counter.svelte';
    import Bridge from './Bridge.svelte';

    import { show } from '../store';
    function close() {
        show.update(_ => false);
    }
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="svelte-modal-mask" on:click|self|stopPropagation={close}>
        <div class="svelte-modal-container">
            <span><button class="svelte-modal-close-button" on:click={close}>&times;</button></span>
            <div class="svelte-b4-container">
                <div class="svelte-b4-row">
                    <div>
                        <Test msg={'Welcome Svelte'} />
                    </div>
                    <div>
                        <Counter />
                    </div>
                    <div>
                        <Bridge />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .svelte-b4-container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }

    .svelte-b4-row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
    }

    .svelte-b4-row > * {
        flex: 0 0 33%;
        max-width: 33%;
        position: relative;
        width: 100%;
    }

    .svelte-modal-mask {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        padding-top: 20px;
        overflow: auto;
        min-width: 1200px;
        max-height: 95vh;
        animation: anime-svelte 0.25s;
        font-size: min(3.2vh, 3.2vw);
    }

    .svelte-modal-container {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 95%;
        min-height: 80vh;
    }

    .svelte-modal-close-button {
        color: #aaa;
        float: right;
        font-size: 24px;
        font-weight: bold;
    }
</style>
