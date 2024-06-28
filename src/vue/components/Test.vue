<template>
    <div>
        <h1>{{ msg }}</h1>
        <h3 class="vue-test-class">Vue Test Page</h3>
        <div class="vue-test-class">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="test-large-logo vue" alt="Vue logo" />
                </div>
            </div>
        </div>
        <div class="vue-test-class">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="test-logo" alt="Vue logo" />
                </div>
                <div>
                    <a class="vue-test-class-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/pinia.svg" class="test-logo" alt="Pinia logo" />
                </div>
                <div>
                    <a class="vue-test-class-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/react.svg" class="test-logo" alt="React logo" />
                </div>
                <div>
                    <a class="vue-test-class-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/redux.svg" class="test-logo" alt="Redux logo" />
                </div>
                <div>
                    <a class="vue-test-class-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
                </div>
            </div>
        </div>
        <div class="vue-test-class">
            <div>
                <div>
                    <img src="../../assets/svg/less.svg" class="test-logo less" alt="Less logo" />
                </div>
                <div>
                    <a class="vue-test-class-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/sass.svg" class="test-logo sass" alt="Sass logo" />
                </div>
                <div>
                    <a class="vue-test-class-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/stylus.svg" class="test-logo stylus" alt="Stylus logo" />
                </div>
                <div>
                    <a class="vue-test-class-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
                </div>
            </div>
        </div>
        <div className="vue-test-class">
            <div>
                <div>
                    <img src="../../assets/svg/preact.svg" className="test-logo" alt="Preact logo" />
                </div>
                <div>
                    <a className="vue-test-class-preact" href="https://preactjs.com" target="_blank" rel="noopener">Preact</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/lit.svg" className="test-logo" alt="Lit logo" />
                </div>
                <div>
                    <a className="vue-test-class-lit" href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/svelte.svg" className="test-logo" alt="Svelte logo" />
                </div>
                <div>
                    <a className="vue-test-class-svelte" href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/solid.svg" className="test-logo" alt="Solid logo" />
                </div>
                <div>
                    <a className="vue-test-class-solid" href="https://www.solidjs.com" target="_blank" rel="noopener">Solid</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        msg: String,
    });
</script>

<style>
    div.vue-test-class {
        display: flex;
        justify-content: space-evenly;
    }

    div.vue-test-class > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h3.vue-test-class {
        margin: 40px 0 0;
    }

    div.vue-test-class {
        list-style-type: none;
        padding: 0;
    }

    div.vue-test-class > div {
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

    a.vue-test-class-preact {
        color: #673ab8;
    }

    a.vue-test-class-lit {
        color: #2843f6;
    }

    a.vue-test-class-svelte {
        color: #f96743;
    }

    a.vue-test-class-solid {
        color: #446b9e;
    }

    .test-logo {
        height: 128px;
    }

    .test-large-logo.vue {
        height: 160px;
        animation: rotate-vue 8s linear infinite;
    }

    @keyframes rotate-vue {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
