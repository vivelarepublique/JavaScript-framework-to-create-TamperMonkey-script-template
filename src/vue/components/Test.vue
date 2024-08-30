<template>
    <div>
        <h1 class="test-h-vue">{{ msg }}</h1>
        <h3 class="test-h3 test-h-vue">Vue Test Page</h3>
        <div class="test-div">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="test-large-logo vue" alt="Vue logo" />
                </div>
            </div>
        </div>
        <div class="test-div">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="test-logo" alt="Vue logo" />
                </div>
                <div>
                    <a class="test-a-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/pinia.svg" class="test-logo" alt="Pinia logo" />
                </div>
                <div>
                    <a class="test-a-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/react.svg" class="test-logo" alt="React logo" />
                </div>
                <div>
                    <a class="test-a-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/redux.svg" class="test-logo" alt="Redux logo" />
                </div>
                <div>
                    <a class="test-a-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
                </div>
            </div>
        </div>
        <div class="test-div">
            <div>
                <div>
                    <img src="../../assets/svg/less.svg" class="test-logo less" alt="Less logo" />
                </div>
                <div>
                    <a class="test-a-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/sass.svg" class="test-logo sass" alt="Sass logo" />
                </div>
                <div>
                    <a class="test-a-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/stylus.svg" class="test-logo stylus" alt="Stylus logo" />
                </div>
                <div>
                    <a class="test-a-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
                </div>
            </div>
        </div>
        <div class="test-div">
            <div>
                <div>
                    <img src="../../assets/svg/preact.svg" class="test-logo" alt="Preact logo" />
                </div>
                <div>
                    <a class="test-a-preact" href="https://preactjs.com" target="_blank" rel="noopener">Preact</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/lit.svg" class="test-logo" alt="Lit logo" />
                </div>
                <div>
                    <a class="test-a-lit" href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/svelte.svg" class="test-logo" alt="Svelte logo" />
                </div>
                <div>
                    <a class="test-a-svelte" href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/solid.svg" class="test-logo" alt="Solid logo" />
                </div>
                <div>
                    <a class="test-a-solid" href="https://www.solidjs.com" target="_blank" rel="noopener">Solid</a>
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
    h3.test-h3 {
        margin: 40px 0 0;
    }

    h1.test-h-vue,
    h3.test-h-vue {
        color: #42b883;
    }

    div.test-div {
        display: flex;
        justify-content: space-evenly;
    }

    div.test-div > div {
        display: inline-block;
        margin: 0 10px;
    }

    div.test-div > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a.test-a-vue {
        color: #42b883;
    }

    a.test-a-pinia {
        color: #ffd859;
    }

    a.test-a-react {
        color: #58c4dc;
    }

    a.test-a-redux {
        color: #764abc;
    }

    a.test-a-less {
        color: #1d365d;
    }

    a.test-a-sass {
        color: #bf4080;
    }

    a.test-a-stylus {
        color: #6da13f;
    }

    a.test-a-preact {
        color: #673ab8;
    }

    a.test-a-lit {
        color: #2843f6;
    }

    a.test-a-svelte {
        color: #f96743;
    }

    a.test-a-solid {
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
