<template>
    <div class="vue-modal-mask" @click.stop.self="close">
        <div class="vue-modal-container">
            <span><button class="vue-modal-close-button" @click="close">&times;</button></span>
            <div class="container text-center">
                <div class="row">
                    <Test msg="Welcome Vue" class="col-5" />
                    <Counter class="col-3" />
                    <Bridge class="col-2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Test from './Test.vue';
    import Counter from './Counter.vue';
    import Bridge from './Bridge.vue';

    import { useShowStore } from '../store/showStore';
    const showStore = useShowStore();
    const { close } = showStore;
</script>

<style>
    .vue-modal-mask {
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
        animation: anime-vue 0.25s;
        font-size: min(3.2vh, 3.2vw);
    }

    .vue-modal-container {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 95%;
        min-height: 80vh;
    }

    .vue-modal-close-button {
        color: #aaa;
        float: right;
        font-size: 24px;
        font-weight: bold;
    }
</style>
