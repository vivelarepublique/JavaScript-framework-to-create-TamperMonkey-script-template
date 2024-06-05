<template>
    <div>
        <h1>{{ msg }}</h1>
        <h3 class="vue-test-class">Vue Test Page</h3>
        <ul class="vue-test-class">
            <li><a class="vue-test-class-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a></li>
            <li><a class="vue-test-class-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a></li>
            <li><a class="vue-test-class-react" href="https://react.dev" target="_blank" rel="noopener">React</a></li>
            <li><a class="vue-test-class-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a></li>
            <li><a class="vue-test-class-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a></li>
            <li><a class="vue-test-class-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a></li>
            <li><a class="vue-test-class-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        msg: String,
    });
</script>
