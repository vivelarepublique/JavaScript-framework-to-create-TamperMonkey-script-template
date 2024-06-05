<template>
    <div>
        <h1>Bridge</h1>
        <p>Value: {{ sharedState.search }}</p>
    </div>
</template>

<script setup lang="ts">
    import { sharedState } from '../../shared/vueState/sharedState';
</script>
