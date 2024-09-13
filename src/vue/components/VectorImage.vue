<template>
    <div>
        <p class="framework-test-header-vue framework-test-heavy">{{ msg }}</p>
        <p class="framework-test-header-vue">Vue Test Page</p>
        <div class="framework-test-div">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="framework-test-large-logo framework-test-rotate-logo" alt="Vue logo" />
                </div>
            </div>
        </div>
        <div class="framework-test-div">
            <div>
                <div>
                    <img src="../../assets/svg/vue.svg" class="framework-test-logo" alt="Vue logo" />
                </div>
                <div>
                    <a class="framework-test-a-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/pinia.svg" class="framework-test-logo" alt="Pinia logo" />
                </div>
                <div>
                    <a class="framework-test-a-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/react.svg" class="framework-test-logo" alt="React logo" />
                </div>
                <div>
                    <a class="framework-test-a-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/redux.svg" class="framework-test-logo" alt="Redux logo" />
                </div>
                <div>
                    <a class="framework-test-a-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
                </div>
            </div>
        </div>
        <div class="framework-test-div">
            <div>
                <div>
                    <img src="../../assets/svg/less.svg" class="framework-test-logo less-logo" alt="Less logo" />
                </div>
                <div>
                    <a class="framework-test-a-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/sass.svg" class="framework-test-logo sass-logo" alt="Sass logo" />
                </div>
                <div>
                    <a class="framework-test-a-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/stylus.svg" class="framework-test-logo stylus-logo" alt="Stylus logo" />
                </div>
                <div>
                    <a class="framework-test-a-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
                </div>
            </div>
        </div>
        <div class="framework-test-div">
            <div>
                <div>
                    <img src="../../assets/svg/preact.svg" class="framework-test-logo" alt="Preact logo" />
                </div>
                <div>
                    <a class="framework-test-a-preact" href="https://preactjs.com" target="_blank" rel="noopener">Preact</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/lit.svg" class="framework-test-logo" alt="Lit logo" />
                </div>
                <div>
                    <a class="framework-test-a-lit" href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/svelte.svg" class="framework-test-logo" alt="Svelte logo" />
                </div>
                <div>
                    <a class="framework-test-a-svelte" href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
                </div>
            </div>
            <div>
                <div>
                    <img src="../../assets/svg/solid.svg" class="framework-test-logo" alt="Solid logo" />
                </div>
                <div>
                    <a class="framework-test-a-solid" href="https://www.solidjs.com" target="_blank" rel="noopener">Solid</a>
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
    .framework-test-header-vue {
        color: #42b883;
    }
</style>
