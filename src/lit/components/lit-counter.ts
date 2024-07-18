import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-counter')
export class LitCounter extends LitElement {
    @property({ type: Number })
    count = 0;

    private _increment() {
        this.count = this.count + 1;
        this.dispatchEvent(new CustomEvent('count-updated', { detail: this.count, bubbles: false, composed: true }));
    }

    private _decrement() {
        this.count = this.count - 1;
        this.dispatchEvent(new CustomEvent('count-updated', { detail: this.count, bubbles: false, composed: true }));
    }

    render() {
        return html`
            <div>
                <h1>Counter</h1>
                <p>Count: ${this.count}</p>
                <div class="lit-counter-row">
                    <button class="lit-counter-button" @click=${this._increment}>Increment</button>
                    <button class="lit-counter-button" @click=${this._decrement}>Decrement</button>
                </div>
            </div>
        `;
    }

    static styles = css`
        .lit-counter-button {
            appearance: none;
            background: none;
            font-size: 32px;
            padding-left: 12px;
            padding-right: 12px;
            outline: none;
            border: 2px solid transparent;
            color: #2843f6;
            padding-bottom: 4px;
            cursor: pointer;
            background-color: rgba(112, 76, 182, 0.1);
            border-radius: 2px;
            transition: all 0.15s;
        }

        .lit-counter-row > .lit-counter-button {
            margin-left: 4px;
            margin-right: 8px;
        }

        .lit-counter-button:hover,
        .lit-counter-button:focus {
            border: 2px solid #2843f666;
        }

        .lit-counter-button:active {
            background-color: #2843f633;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-counter': LitCounter;
    }
}