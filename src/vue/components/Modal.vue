<template>
    <div class="modal-mask" @click.stop.self="close">
        <div class="modal-container">
            <span><button class="modal-close-button" @click="close">&times;</button></span>
            <div class="b4-container">
                <div class="b4-row">
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
