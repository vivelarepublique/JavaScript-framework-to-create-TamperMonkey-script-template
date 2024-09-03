<script lang="ts">
    import Test from './Test.svelte';
    import Counter from './Counter.svelte';
    import Bridge from './Bridge.svelte';

    import { show } from '../store/showStore';
    function close() {
        show.set(false);
    }
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="framework-test-modal-mask" on:click|self|stopPropagation={close}>
        <div class="framework-test-modal-container">
            <span><button class="framework-test-modal-close-button" on:click={close}>&times;</button></span>
            <div class="container text-center">
                <div class="row">
                    <div class="col-5">
                        <Test msg={'Welcome Svelte'} />
                    </div>
                    <div class="col-3">
                        <Counter />
                    </div>
                    <div class="col-2">
                        <Bridge />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .framework-test-modal-mask {
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
        animation: anime-framework-test 0.25s;
        font-size: min(3.2vh, 3.2vw);
    }

    .framework-test-modal-container {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 95%;
        min-height: 80vh;
    }

    .framework-test-modal-close-button {
        color: #aaa;
        float: right;
        font-size: 24px;
        font-weight: bold;
    }
</style>
