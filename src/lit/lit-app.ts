import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './components/lit-modal';

@customElement('lit-app')
export class LitApp extends LitElement {
    @property({ type: Boolean })
    show = false;

    render() {
        return html`
            <button id="lit-modal" @click=${this._open} part="button">Show Lit Modal</button>
            ${this.show ? html`<lit-modal .isShow=${this.show} @show-changed=${this.handleShowChanged}></lit-modal>` : nothing}
        `;
    }

    handleShowChanged(event: CustomEvent) {
        this.show = event.detail.value;
    }

    private _open() {
        this.show = true;
    }

    static styles = css`
        #lit-modal {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 40%;
            transform: translateX(-50%);
            animation: animetop 0.25s;
            padding: 10px 20px;
            margin: 5px 10px;
            border: none;
            background-color: #2843f6;
            color: white;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-app': LitApp;
    }
}
