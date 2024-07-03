import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

@customElement('lit-test')
export class LitTest extends LitElement {
    @property({ type: String })
    msg = '';

    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <div>
                <h1 class="lit-test-h">${this.msg}</h1>
                <h3 class="lit-test-h">Lit Test Page</h3>
                <div class="lit-test-div">
                    <div>
                        <div>
                            <img src=${litLogo} class="test-large-logo lit" alt="Lit logo" />
                        </div>
                    </div>
                </div>
                <div class="lit-test-div">
                    <div>
                        <div>
                            <img src=${vueLogo} class="test-logo" alt="Vue logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-vue" href="https://vuejs.org" target="_blank" rel="noopener"> Vue </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${piniaLogo} class="test-logo" alt="Pinia logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-pinia" href="https://pinia.vuejs.org" target="_blank" rel="noopener"> Pinia </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${reactLogo} class="test-logo" alt="React logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-react" href="https://react.dev" target="_blank" rel="noopener"> React </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${reduxLogo} class="test-logo" alt="Redux logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-redux" href="https://redux.js.org" target="_blank" rel="noopener"> Redux </a>
                        </div>
                    </div>
                </div>
                <div class="lit-test-div">
                    <div>
                        <div>
                            <img src=${lessLogo} class="test-logo less" alt="Less logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-less" href="https://lesscss.org" target="_blank" rel="noopener"> Less </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${sassLogo} class="test-logo sass" alt="Sass logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-sass" href="https://sass-lang.com" target="_blank" rel="noopener"> Sass </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${stylusLogo} class="test-logo stylus" alt="Stylus logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-stylus" href="https://stylus-lang.com" target="_blank" rel="noopener"> Stylus </a>
                        </div>
                    </div>
                </div>
                <div class="lit-test-div">
                    <div>
                        <div>
                            <img src=${preactLogo} class="test-logo" alt="Preact logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-preact" href="https://preactjs.com" target="_blank" rel="noopener"> Preact </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${litLogo} class="test-logo" alt="Lit logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-lit" href="https://lit.dev" target="_blank" rel="noopener"> Lit </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${svelteLogo} class="test-logo" alt="Svelte logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-svelte" href="https://svelte.dev" target="_blank" rel="noopener"> Svelte </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src=${solidLogo} class="test-logo" alt="Solid logo" />
                        </div>
                        <div>
                            <a class="lit-test-a-solid" href="https://www.solidjs.com" target="_blank" rel="noopener"> Solid </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        h3.lit-test-h {
            margin: 40px 0 0;
        }

        h1.lit-test-h,
        h3.lit-test-h {
            color: #2843f6;
        }

        div.lit-test-div {
            display: flex;
            justify-content: space-evenly;
        }

        div.lit-test-div > div {
            display: inline-block;
            margin: 0 10px;
        }

        div.lit-test-div > div > div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        a.lit-test-a-vue {
            color: #42b883;
        }

        a.lit-test-a-pinia {
            color: #ffd859;
        }

        a.lit-test-a-react {
            color: #58c4dc;
        }

        a.lit-test-a-redux {
            color: #764abc;
        }

        a.lit-test-a-less {
            color: #1d365d;
        }

        a.lit-test-a-sass {
            color: #bf4080;
        }

        a.lit-test-a-stylus {
            color: #6da13f;
        }

        a.lit-test-a-preact {
            color: #673ab8;
        }

        a.lit-test-a-lit {
            color: #2843f6;
        }

        a.lit-test-a-svelte {
            color: #f96743;
        }

        a.lit-test-a-solid {
            color: #446b9e;
        }

        .test-logo {
            height: 128px;
        }

        .test-large-logo.lit {
            height: 160px;
            animation: rotate-lit 8s linear infinite;
        }

        @keyframes rotate-lit {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-test': LitTest;
    }
}
