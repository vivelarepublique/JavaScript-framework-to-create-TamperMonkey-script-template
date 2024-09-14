<template>
    <div class="framework-test-modal-mask" @click.stop.self="close">
        <div class="framework-test-modal-container">
            <span><button class="framework-test-modal-close-button" @click="close">&times;</button></span>

            <div class="container-fluid text-center">
                <div class="row">
                    <div class="col-2">
                        <p class="framework-test-header-vue framework-test-heavy">{{ msg }}</p>
                        <div class="btn-group-vertical" role="group">
                            <button type="button" :class="{ 'btn-framework-test-vue': currentView === 'VectorImage' }" @click="currentView = 'VectorImage'" class="btn btn-framework-test">Vector Image</button>
                            <button type="button" :class="{ 'btn-framework-test-vue': currentView === 'Counter' }" @click="currentView = 'Counter'" class="btn btn-framework-test">Counter</button>
                            <button type="button" :class="{ 'btn-framework-test-vue': currentView === 'WindowEvent' }" @click="currentView = 'WindowEvent'" class="btn btn-framework-test">Window Event</button>
                        </div>
                    </div>
                    <component :is="componentsMap[currentView]" class="col-8" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        msg: String,
    });
    import { ref } from 'vue';
    import type { Component } from 'vue';

    import VectorImage from './VectorImage.vue';
    import Counter from './Counter.vue';
    import WindowEvent from './WindowEvent.vue';

    import { useShowStore } from '../store/showStore';
    const showStore = useShowStore();
    const { close } = showStore;

    const currentView = ref('VectorImage');
    const componentsMap: Record<string, Component> = {
        VectorImage,
        Counter,
        WindowEvent,
    };
</script>

<style>
    .btn-framework-test-vue {
        color: #fff !important;
        background-color: #42b883 !important;
        border-color: #42b883 !important;
    }
    .btn-framework-test-vue:hover,
    .btn-framework-test-vue:active {
        color: #fff !important;
        background-color: #42b88366 !important;
        border-color: #42b88333 !important;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
    }
</style>
