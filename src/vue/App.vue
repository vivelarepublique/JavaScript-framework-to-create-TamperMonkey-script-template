<script setup lang="ts">
    import Modal from './components/Modal.vue';
    import { storeToRefs } from 'pinia';
    import { useShowStore } from './store/showStore';

    const showStore = useShowStore();
    const { show } = storeToRefs(showStore);
    const { open } = showStore;
</script>

<template>
    <button id="framework-test-vue-modal" class="framework-test-modal-switch" @click="open">Show Vue Modal</button>
    <Modal v-if="show"></Modal>
</template>

<style>
    #framework-test-vue-modal {
        left: 10%;
        background-color: #42b883;
    }
</style>
