<template>
    <div>
        <h1>{{ msg }}</h1>
        <h3 class="test-class">Vue</h3>
        <ul class="test-class">
            <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
            <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
            <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
            <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
            <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps({
    msg: String,
});
</script>

<style>
h3.test-class {
    margin: 40px 0 0;
}
ul.test-class {
    list-style-type: none;
    padding: 0;
}
ul.test-class > li {
    display: inline-block;
    margin: 0 10px;
}
ul.test-class > li > a {
    color: #42b983;
}
</style>
