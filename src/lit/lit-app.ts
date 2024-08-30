import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { provide } from '@lit/context';
import { showStore, showContext } from './context/show-context';
import { CounterStore, counterContext } from './context/counter-context';

import './components/lit-modal';

@customElement('lit-app')
export class LitApp extends LitElement {
    @provide({ context: showContext })
    showStore: showStore = new showStore();

    @provide({ context: counterContext })
    counterStore: CounterStore = new CounterStore();

    _open() {
        this.showStore.open();
        this.requestUpdate();
    }

    handleShowChanged(event: CustomEvent) {
        if (!event.detail) this.showStore.close();
        this.requestUpdate();
    }

    render() {
        return html`
            <button id="lit-modal" @click=${this._open} part="button">Show Lit Modal</button>
            ${this.showStore.show ? html`<lit-modal @show-changed=${this.handleShowChanged}></lit-modal>` : nothing}
        `;
    }

    static styles = css`
        #lit-modal {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 40%;
            transform: translateX(-50%);
            animation: anime-lit 0.25s;
            padding: 10px 20px;
            margin: 5px 10px;
            border: none;
            background-color: #2843f6;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }

        @keyframes anime-lit {
            0% {
                top: -100px;
                opacity: 0;
            }

            100% {
                top: 0;
                opacity: 1;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-app': LitApp;
    }
}
