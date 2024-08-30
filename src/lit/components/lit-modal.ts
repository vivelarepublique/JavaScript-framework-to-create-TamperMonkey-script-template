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
                    <div class="container text-center">
                        <div class="row">
                            <lit-test .msg="${'Welcome Lit'}" class="col-5"></lit-test>
                            <lit-counter .count="${this.count}" @count-updated=${this.handleCountChanged} class="col-3"></lit-counter>
                            <lit-bridge class="col-2"></lit-bridge>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .container,
        .container-fluid,
        .container-xxl,
        .container-xl,
        .container-lg,
        .container-md,
        .container-sm {
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            width: 100%;
            padding-right: calc(var(--bs-gutter-x) * 0.5);
            padding-left: calc(var(--bs-gutter-x) * 0.5);
            margin-right: auto;
            margin-left: auto;
        }

        .text-center {
            text-align: center !important;
        }

        .row {
            --bs-gutter-x: 1.5rem;
            --bs-gutter-y: 0;
            display: flex;
            flex-wrap: wrap;
            margin-top: calc(-1 * var(--bs-gutter-y));
            margin-right: calc(-0.5 * var(--bs-gutter-x));
            margin-left: calc(-0.5 * var(--bs-gutter-x));
        }

        .row > * {
            flex-shrink: 0;
            width: 100%;
            max-width: 100%;
            padding-right: calc(var(--bs-gutter-x) * 0.5);
            padding-left: calc(var(--bs-gutter-x) * 0.5);
            margin-top: var(--bs-gutter-y);
        }

        .col-2 {
            flex: 0 0 auto;
            width: 16.66666667%;
        }

        .col-3 {
            flex: 0 0 auto;
            width: 25%;
        }

        .col-5 {
            flex: 0 0 auto;
            width: 41.66666667%;
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
