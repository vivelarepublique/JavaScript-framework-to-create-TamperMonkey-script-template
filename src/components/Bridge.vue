<template>
    <div>
        <h1>Bridge</h1>
        <p>Value: {{ sharedStates.search }}</p>
    </div>
</template>

<script setup lang="ts">
import { sharedStates } from '../bridge/stores/sharedStates';
</script>
