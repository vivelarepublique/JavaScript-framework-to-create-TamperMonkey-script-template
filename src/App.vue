<script setup lang="ts">
    import Modal from './vue/components/Modal.vue';
    import { storeToRefs } from 'pinia';
    import { useSwitcherStore } from './vue/store/switcher';

    const store = useSwitcherStore();
    const { show } = storeToRefs(store);
    const { open } = store;
</script>

<template>
    <button id="vue-modal" @click="open">Show Vue Modal</button>
    <Modal v-show="show"></Modal>
</template>

<style>
    @import './vue/css/modal.css';
</style>
