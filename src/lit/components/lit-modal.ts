import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-modal')
export class LitModal extends LitElement {
    @property({ type: Boolean })
    show = true;

    private _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
        }
    }

    render() {
        return html`
            <div class="modal-mask" @click=${this._close}>
                <div class="modal-container">
                    <span>
                        <button class="modal-close-button" @click=${this._close}>&times;</button>
                    </span>
                    <div class="b4-container">
                        <div class="b4-row"></div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .b4-container {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
        }

        .b4-row {
            display: flex;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
        }

        .b4-row > * {
            flex: 0 0 33%;
            max-width: 33%;
            position: relative;
            width: 100%;
        }

        .modal-mask {
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
            animation: animetop 0.25s;
            font-size: min(2vh, 2vw);
        }

        .modal-container {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 95%;
            min-height: 80vh;
        }

        .modal-close-button {
            color: #aaa;
            float: right;
            font-size: 24px;
            font-weight: bold;
        }

        @keyframes animetop {
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
        'lit-modal': LitModal;
    }
}
