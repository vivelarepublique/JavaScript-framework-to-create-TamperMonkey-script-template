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
    <h1 class="framework-test-h-svelte">{msg}</h1>
    <h3 class="framework-test-h3 framework-test-h-svelte">Svelte Test Page</h3>
    <div class="framework-test-div">
        <div>
            <div>
                <img src={svelteLogo} class="framework-test-large-logo framework-test-rotate-logo" alt="Svelte logo" />
            </div>
        </div>
    </div>
    <div class="framework-test-div">
        <div>
            <div>
                <img src={vueLogo} class="framework-test-logo" alt="Vue logo" />
            </div>
            <div>
                <a class="framework-test-a-vue" href="https://vuejs.org" target="_blank" rel="noopener">Vue</a>
            </div>
        </div>
        <div>
            <div>
                <img src={piniaLogo} class="framework-test-logo" alt="Pinia logo" />
            </div>
            <div>
                <a class="framework-test-a-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a>
            </div>
        </div>
        <div>
            <div>
                <img src={reactLogo} class="framework-test-logo" alt="React logo" />
            </div>
            <div>
                <a class="framework-test-a-react" href="https://react.dev" target="_blank" rel="noopener">React</a>
            </div>
        </div>
        <div>
            <div>
                <img src={reduxLogo} class="framework-test-logo" alt="Redux logo" />
            </div>
            <div>
                <a class="framework-test-a-redux" href="https://redux.js.org" target="_blank" rel="noopener">Redux</a>
            </div>
        </div>
    </div>
    <div class="framework-test-div">
        <div>
            <div>
                <img src={lessLogo} class="framework-test-logo less-logo" alt="Less logo" />
            </div>
            <div>
                <a class="framework-test-a-less" href="https://lesscss.org" target="_blank" rel="noopener">Less</a>
            </div>
        </div>
        <div>
            <div>
                <img src={sassLogo} class="framework-test-logo sass-logo" alt="Sass logo" />
            </div>
            <div>
                <a class="framework-test-a-sass" href="https://sass-lang.com" target="_blank" rel="noopener">Sass</a>
            </div>
        </div>
        <div>
            <div>
                <img src={stylusLogo} class="framework-test-logo stylus-logo" alt="Stylus logo" />
            </div>
            <div>
                <a class="framework-test-a-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener">Stylus</a>
            </div>
        </div>
    </div>
    <div class="framework-test-div">
        <div>
            <div>
                <img src={preactLogo} class="framework-test-logo" alt="Preact logo" />
            </div>
            <div>
                <a class="framework-test-a-preact" href="https://preactjs.com" target="_blank" rel="noopener">Preact</a>
            </div>
        </div>
        <div>
            <div>
                <img src={litLogo} class="framework-test-logo" alt="Lit logo" />
            </div>
            <div>
                <a class="framework-test-a-lit" href="https://lit.dev" target="_blank" rel="noopener">Lit</a>
            </div>
        </div>
        <div>
            <div>
                <img src={svelteLogo} class="framework-test-logo" alt="Svelte logo" />
            </div>
            <div>
                <a class="framework-test-a-svelte" href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
            </div>
        </div>
        <div>
            <div>
                <img src={solidLogo} class="framework-test-logo" alt="Solid logo" />
            </div>
            <div>
                <a class="framework-test-a-solid" href="https://www.solidjs.com" target="_blank" rel="noopener">Solid</a>
            </div>
        </div>
    </div>
</div>

<style>
    h3.framework-test-h3 {
        margin: 40px 0 0;
    }

    h1.framework-test-h-svelte,
    h3.framework-test-h-svelte {
        color: #f96743;
    }

    div.framework-test-div {
        display: flex;
        justify-content: space-evenly;
    }

    div.framework-test-div > div {
        display: inline-block;
        margin: 0 10px;
    }

    div.framework-test-div > div > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a.framework-test-a-vue {
        color: #42b883;
    }

    a.framework-test-a-pinia {
        color: #ffd859;
    }

    a.framework-test-a-react {
        color: #58c4dc;
    }

    a.framework-test-a-redux {
        color: #764abc;
    }

    a.framework-test-a-less {
        color: #1d365d;
    }

    a.framework-test-a-sass {
        color: #bf4080;
    }

    a.framework-test-a-stylus {
        color: #6da13f;
    }

    a.framework-test-a-preact {
        color: #673ab8;
    }

    a.framework-test-a-lit {
        color: #2843f6;
    }

    a.framework-test-a-svelte {
        color: #f96743;
    }

    a.framework-test-a-solid {
        color: #446b9e;
    }

    .framework-test-logo {
        height: 128px;
    }

    .framework-test-large-logo.framework-test-rotate-logo {
        height: 160px;
        animation: rotate-framework-test 8s linear infinite;
    }

    @keyframes rotate-framework-test {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
