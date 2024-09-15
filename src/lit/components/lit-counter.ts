import { html } from 'lit';
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
                <div class="container text-center">
                    <div class="row align-items-center">
                        <div class="col-4"></div>
                        <div class="col-2">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._increment}">Increment</button>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._decrement}">Decrement</button>
                        </div>
                        <div class="col-4"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-counter': LitCounter;
    }
}
