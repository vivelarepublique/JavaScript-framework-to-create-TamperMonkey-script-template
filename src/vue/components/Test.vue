<template>
    <div>
        <h1>{{ msg }}</h1>
        <h3 class="vue-test-class">Vue Test Page</h3>
        <ul class="vue-test-class">
            <li>
                <div>
                    <img src="../../assets/svg/vue.svg" class="test-logo" alt="Vue logo" />
                </div>
                <div>
                    <a class="vue-test-class-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
                </div>
            </li>
            <li>
                <div>
                    <img src="../../assets/svg/pinia.svg" class="test-logo" alt="Pinia logo" />
                </div>
                <div>
                    <a class="vue-test-class-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
                </div>
            </li>
            <li>
                <div>
                    <img src="../../assets/svg/react.svg" class="test-logo" alt="React logo" />
                </div>
                <div>
                    <a class="vue-test-class-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
                </div>
            </li>
            <li>
                <div>
                    <img src="../../assets/svg/redux.svg" class="test-logo" alt="Redux logo" />
                </div>
                <div>
                    <a class="vue-test-class-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
                </div>
            </li>
        </ul>
        <ul class="vue-test-class">
            <li>
                <div>
                    <img src="../../assets/svg/less.svg" class="test-logo less" alt="Less logo" />
                </div>
                <div>
                    <a class="vue-test-class-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
                </div>
            </li>
            <li>
                <div>
                    <img src="../../assets/svg/sass.svg" class="test-logo sass" alt="Sass logo" />
                </div>
                <div>
                    <a class="vue-test-class-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
                </div>
            </li>
            <li>
                <div>
                    <img src="../../assets/svg/stylus.svg" class="test-logo stylus" alt="Stylus logo" />
                </div>
                <div>
                    <a class="vue-test-class-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        msg: String,
    });
</script>

<style>
    ul.vue-test-class > li > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h3.vue-test-class {
        margin: 40px 0 0;
    }

    ul.vue-test-class {
        list-style-type: none;
        padding: 0;
    }

    ul.vue-test-class > li {
        display: inline-block;
        margin: 0 10px;
    }
    a.vue-test-class-vue {
        color: #42b883;
    }

    a.vue-test-class-pinia {
        color: #ffd859;
    }

    a.vue-test-class-react {
        color: #58c4dc;
    }

    a.vue-test-class-redux {
        color: #764abc;
    }

    a.vue-test-class-less {
        color: #1d365d;
    }

    a.vue-test-class-sass {
        color: #bf4080;
    }

    a.vue-test-class-stylus {
        color: #6da13f;
    }

    .test-logo {
        height: 100px;
    }
</style>
