<template>
    <div class="modal-mask" @click.stop.self="close">
        <div class="modal-container">
            <span><button class="modal-close-button" @click="close">&times;</button></span>
            <div id="main-app" class="flex-div">
                <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
                <Counter />
                <Bridge />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue';
import Counter from './Counter.vue';
import Bridge from './Bridge.vue';

import { useSwitcherStore } from '../store/switcher';
const switcher = useSwitcherStore();
const { close } = switcher;
</script>

<style>
.modal-mask {
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
    animation: animetop 0.25s;
}

.modal-container {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 95%;
    min-height: 80vh;
}

.modal-close-button {
    color: #aaa;
    float: right;
    font-size: 24px;
    font-weight: bold;
}
</style>
