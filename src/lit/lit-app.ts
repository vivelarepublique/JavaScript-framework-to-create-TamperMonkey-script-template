import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from './extends/baseComponents';

import { provide } from '@lit/context';
import { showStore, showContext } from './context/show-context';
import { CounterStore, counterContext } from './context/counter-context';

import './components/lit-modal';

@customElement('lit-app')
export class LitApp extends BaseComponent {
    @provide({ context: showContext })
    showStore: showStore = new showStore();

    @provide({ context: counterContext })
    counterStore: CounterStore = new CounterStore();

    _open() {
        this.showStore.open();
        this.requestUpdate();
    }

    handleShowChanged(event: CustomEvent) {
        if (!event.detail) {
            this.showStore.close();
            this.requestUpdate();
        }
    }

    render() {
        return html`
            <button id="framework-test-lit-modal" class="framework-test-modal-switch" @click=${this._open} part="button">Show Lit Modal</button>
            ${this.showStore.show ? html`<lit-modal @show-changed=${this.handleShowChanged} .msg="${'Welcome Lit'}"></lit-modal>` : nothing}
        `;
    }

    static styles = css`
        #framework-test-lit-modal {
            left: 40%;
            background-color: var(--ft-color-lit);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-app': LitApp;
    }
}
