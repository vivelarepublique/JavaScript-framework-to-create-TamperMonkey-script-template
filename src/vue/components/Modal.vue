<template>
    <div class="framework-test-modal-mask" @click.stop.self="close">
        <div class="framework-test-modal-container">
            <span><button class="framework-test-modal-close-button" @click="close">&times;</button></span>
            <div class="container text-center">
                <div class="row">
                    <VectorImage msg="Welcome Vue" class="col-5" />
                    <Counter class="col-3" />
                    <WindowEvent class="col-2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import VectorImage from './VectorImage.vue';
    import Counter from './Counter.vue';
    import WindowEvent from './WindowEvent.vue';

    import { useShowStore } from '../store/showStore';
    const showStore = useShowStore();
    const { close } = showStore;
</script>
