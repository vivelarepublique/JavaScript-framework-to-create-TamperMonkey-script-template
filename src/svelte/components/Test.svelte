<script lang="ts">
    import vueLogo from '../../assets/svg/vue.svg';
    import piniaLogo from '../../assets/svg/pinia.svg';
    import reactLogo from '../../assets/svg/react.svg';
    import reduxLogo from '../../assets/svg/redux.svg';

    import lessLogo from '../../assets/svg/less.svg';
    import sassLogo from '../../assets/svg/sass.svg';
    import stylusLogo from '../../assets/svg/stylus.svg';

    import preactLogo from '../../assets/svg/preact.svg';
    import litLogo from '../../assets/svg/lit.svg';
    import svelteLogo from '../../assets/svg/svelte.svg';
    import solidLogo from '../../assets/svg/solid.svg';
    export let msg = '';
</script>

<div>
    <h1 class="svelte-test-h">{msg}</h1>
    <h3 class="svelte-test-h">Svelte Test Page</h3>
    <div class="svelte-test-div">
        <div>
            <div>
                <img src={svelteLogo} class="test-large-logo svelte" alt="Svelte logo" />
            </div>
        </div>
    </div>
    <div class="svelte-test-div">
        <div>
            <div>
                <img src={vueLogo} class="test-logo" alt="Vue logo" />
            </div>
            <div>
                <a class="svelte-test-a-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
            </div>
        </div>
        <div>
            <div>
                <img src={piniaLogo} class="test-logo" alt="Pinia logo" />
            </div>
            <div>
                <a class="svelte-test-a-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
            </div>
        </div>
        <div>
            <div>
                <img src={reactLogo} class="test-logo" alt="React logo" />
            </div>
            <div>
                <a class="svelte-test-a-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
            </div>
        </div>
        <div>
            <div>
                <img src={reduxLogo} class="test-logo" alt="Redux logo" />
            </div>
            <div>
                <a class="svelte-test-a-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
            </div>
        </div>
    </div>
    <div class="svelte-test-div">
        <div>
            <div>
                <img src={lessLogo} class="test-logo less" alt="Less logo" />
            </div>
            <div>
                <a class="svelte-test-a-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
            </div>
        </div>
        <div>
            <div>
                <img src={sassLogo} class="test-logo sass" alt="Sass logo" />
            </div>
            <div>
                <a class="svelte-test-a-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
            </div>
        </div>
        <div>
            <div>
                <img src={stylusLogo} class="test-logo stylus" alt="Stylus logo" />
            </div>
            <div>
                <a class="svelte-test-a-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
            </div>
        </div>
    </div>
    <div class="svelte-test-div">
        <div>
            <div>
                <img src={preactLogo} class="test-logo" alt="Preact logo" />
            </div>
            <div>
                <a class="svelte-test-a-preact" href="https://preactjs.com" target="_blank" rel="noopener">Preact</a>
            </div>
        </div>
        <div>
            <div>
                <img src={litLogo} class="test-logo" alt="Lit logo" />
            </div>
            <div>
                <a class="svelte-test-a-lit" href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
            </div>
        </div>
        <div>
            <div>
                <img src={svelteLogo} class="test-logo" alt="Svelte logo" />
            </div>
            <div>
                <a class="svelte-test-a-svelte" href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
            </div>
        </div>
        <div>
            <div>
                <img src={solidLogo} class="test-logo" alt="Solid logo" />
            </div>
            <div>
                <a class="svelte-test-a-solid" href="https://www.solidjs.com" target="_blank" rel="noopener">Solid</a>
            </div>
        </div>
    </div>
</div>

<style>
    h3.svelte-test-h {
        margin: 40px 0 0;
    }

    h1.svelte-test-h,
    h3.svelte-test-h {
        color: #f96743;
    }

    div.svelte-test-div {
        display: flex;
        justify-content: space-evenly;
    }

    div.svelte-test-div > div {
        display: inline-block;
        margin: 0 10px;
    }

    div.svelte-test-div > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a.svelte-test-a-vue {
        color: #42b883;
    }

    a.svelte-test-a-pinia {
        color: #ffd859;
    }

    a.svelte-test-a-react {
        color: #58c4dc;
    }

    a.svelte-test-a-redux {
        color: #764abc;
    }

    a.svelte-test-a-less {
        color: #1d365d;
    }

    a.svelte-test-a-sass {
        color: #bf4080;
    }

    a.svelte-test-a-stylus {
        color: #6da13f;
    }

    a.svelte-test-a-preact {
        color: #673ab8;
    }

    a.svelte-test-a-lit {
        color: #2843f6;
    }

    a.svelte-test-a-svelte {
        color: #f96743;
    }

    a.svelte-test-a-solid {
        color: #446b9e;
    }

    .test-logo {
        height: 128px;
    }

    .test-large-logo.svelte {
        height: 160px;
        animation: rotate-svelte 8s linear infinite;
    }

    @keyframes rotate-svelte {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
