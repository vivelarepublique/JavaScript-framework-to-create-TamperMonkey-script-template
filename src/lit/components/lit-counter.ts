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
                    <button class="framework-test-counter-button framework-test-counter-button-lit" @click="${this._increment}">Increment</button>
                    <button class="framework-test-counter-button framework-test-counter-button-lit" @click="${this._decrement}">Decrement</button>
                </div>
            </div>
        `;
    }

    static styles = css`
        .framework-test-counter-button-lit {
            color: #2843f6;
        }

        .framework-test-counter-button-lit:hover,
        .framework-test-counter-button-lit:focus {
            border: 2px solid #2843f666;
        }

        .framework-test-counter-button-lit:active {
            background-color: #2843f633;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-counter': LitCounter;
    }
}
