<template>
    <div class="vue-modal-mask" @click.stop.self="close">
        <div class="vue-modal-container">
            <span><button class="vue-modal-close-button" @click="close">&times;</button></span>
            <div class="vue-b4-container">
                <div class="vue-b4-row">
                    <Test msg="Welcome Vue" />
                    <Counter />
                    <Bridge />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Test from './Test.vue';
    import Counter from './Counter.vue';
    import Bridge from './Bridge.vue';

    import { useSwitcherStore } from '../store/switcher';
    const switcher = useSwitcherStore();
    const { close } = switcher;
</script>

<style>
    .vue-b4-container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }

    .vue-b4-row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
    }

    .vue-b4-row > * {
        flex: 0 0 33%;
        max-width: 33%;
        position: relative;
        width: 100%;
    }

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
