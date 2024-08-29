import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './lit-test';
import './lit-counter';
import './lit-bridge';

@customElement('lit-modal')
export class LitModal extends LitElement {
    @property({ type: Boolean })
    show = true;

    @property({ type: Number })
    count = 0;

    handleCountChanged(event: CustomEvent) {
        this.count = event.detail;
    }

    private _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
        }
    }

    render() {
        return html`
            <div class="lit-modal-mask" @click=${this._close}>
                <div class="lit-modal-container">
                    <span>
                        <button class="lit-modal-close-button" @click=${this._close}>&times;</button>
                    </span>
                    <div class="lit-b4-container">
                        <div class="lit-b4-row">
                            <lit-test .msg="${'Welcome Lit'}"></lit-test>
                            <lit-counter .count="${this.count}" @count-updated=${this.handleCountChanged}></lit-counter>
                            <lit-bridge></lit-bridge>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .lit-b4-container {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
        }

        .lit-b4-row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        }

        .lit-b4-row > * {
            flex: 0 0 33%;
            max-width: 33%;
            position: relative;
            width: 100%;
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

        .lit-modal-mask {
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
            animation: anime-lit 0.25s;
            font-size: min(3.2vh, 3.2vw);
        }

        .lit-modal-container {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 95%;
            min-height: 80vh;
        }

        .lit-modal-close-button {
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
