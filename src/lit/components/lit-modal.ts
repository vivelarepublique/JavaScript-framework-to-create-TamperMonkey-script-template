import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { showContext, showStore } from '../context/show-context';

import './lit-test';
import './lit-counter';
import './lit-bridge';

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
                            <lit-test .msg="${'Welcome Lit'}" class="col-5"></lit-test>
                            <lit-counter class="col-3"></lit-counter>
                            <lit-bridge class="col-2"></lit-bridge>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .framework-test-modal-mask {
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            padding-top: 20px;
            overflow: auto;
            min-width: 1200px;
            max-height: 95vh;
            animation: anime-framework-test 0.25s;
            font-size: min(3.2vh, 3.2vw);
        }

        .framework-test-modal-container {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 95%;
            min-height: 80vh;
        }

        .framework-test-modal-close-button {
            color: #aaa;
            float: right;
            font-size: 24px;
            font-weight: bold;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-modal': LitModal;
    }
}
