import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { showContext, showStore } from '../context/show-context';

import './lit-vector-image';
import './lit-counter';
import './lit-window-event';

@customElement('lit-modal')
export class LitModal extends BaseComponent {
    @consume({ context: showContext, subscribe: true })
    public showStore?: showStore;

    _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
        }
    }

    close() {
        this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
    }

    render() {
        return html`
            <div class="framework-test-modal-mask" @click="${this._close}">
                <div class="framework-test-modal-container">
                    <span>
                        <button class="framework-test-modal-close-button" @click="${this.close}">&times;</button>
                    </span>
                    <div class="container text-center">
                        <div class="row">
                            <lit-vector-image .msg="${'Welcome Lit'}" class="col-5"></lit-vector-image>
                            <lit-counter class="col-3"></lit-counter>
                            <lit-window-event class="col-2"></lit-window-event>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-modal': LitModal;
    }
}
