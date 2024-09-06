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
