<script setup lang="ts">
    import Modal from './components/Modal.vue';
    import { storeToRefs } from 'pinia';
    import { useShowStore } from './store/showStore';

    const showStore = useShowStore();
    const { show } = storeToRefs(showStore);
    const { open } = showStore;
</script>

<template>
    <button id="framework-test-vue-modal" class="framework-test-modal-switch" @click="open">
        <span>More</span>
        <img src="../assets/svg/vue.svg" class="ft-button-logo" alt="Vue logo" />
    </button>
    <Modal v-if="show" msg="Welcome Vue"></Modal>
</template>

<style>
    #framework-test-vue-modal {
        top: 10%;
        background-color: var(--ft-border-color-vue);
    }
</style>
