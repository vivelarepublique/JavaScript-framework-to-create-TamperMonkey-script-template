import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { CounterStore, counterContext } from '../context/counter-context';

@customElement('lit-counter')
export class LitCounter extends BaseComponent {
    @consume({ context: counterContext, subscribe: true })
    public counterStore?: CounterStore;

    _increment() {
        this.counterStore?.increment();
        this.requestUpdate();
    }

    _decrement() {
        this.counterStore?.decrement();
        this.requestUpdate();
    }

    render() {
        return html`
            <div>
                <h1>Counter</h1>
                <p>Count: ${this.counterStore?.count}</p>
                <div class="framework-test-counter-row">
                    <button class="framework-test-counter-button lit-counter-button" @click="${this._increment}">Increment</button>
                    <button class="framework-test-counter-button lit-counter-button" @click="${this._decrement}">Decrement</button>
                </div>
            </div>
        `;
    }

    static styles = css`
        .lit-counter-button {
            color: #2843f6;
        }

        .framework-test-counter-button {
            appearance: none;
            background: none;
            font-size: 32px;
            padding: 0 12px;
            outline: none;
            border: 2px solid transparent;
            border-radius: 8px;
            padding-bottom: 4px;
            cursor: pointer;
            background-color: rgba(112, 76, 182, 0.1);
            transition: all 0.15s;
        }

        .framework-test-counter-row > .framework-test-counter-button {
            margin: 0 8px 0 4px;
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
