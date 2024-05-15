<script setup lang="ts">
import Modal from './components/Modal.vue';
import { storeToRefs } from 'pinia';
import { useSwitcherStore } from './store/switcher';

const store = useSwitcherStore();
const { show } = storeToRefs(store);
const { open } = store;
</script>

<template>
    <button id="show-modal" @click="open">Show Modal</button>
    <Modal v-show="show"></Modal>
</template>

<style lang="less">
#show-modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: animetop 0.25s;
    padding: 10px 20px;
    margin: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
}
</style>
