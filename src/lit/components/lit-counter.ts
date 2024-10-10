import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { CounterStore, counterContext } from '../context/counter-context';

@customElement('lit-counter')
export class LitCounter extends BaseComponent {
    @consume({ context: counterContext, subscribe: true })
    public counterStore?: CounterStore;

    @property({ type: Number })
    amount = 0;

    _increment() {
        this.counterStore?.increment();
        this.requestUpdate();
    }

    _decrement() {
        this.counterStore?.decrement();
        this.requestUpdate();
    }

    _incrementByAmount() {
        this.counterStore?.incrementByAmount(this.amount);
        this.requestUpdate();
    }

    _doubleCount() {
        this.counterStore?.doubleCount();
        this.requestUpdate();
    }

    _reset() {
        this.counterStore?.reset();
        this.requestUpdate();
    }

    handleAmountInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.amount = parseInt(target.value);
    }

    render() {
        return html`
            <div class="block">
                <div class="subtitle is-2 header-framework-test-lit">Counter, Count is ${this.counterStore?.count}</div>

                <div class="columns">
                    <div class="column">
                        <button class="button  button-framework-test-lit" @click="${this._increment}">Increment</button>
                    </div>
                    <div class="column">
                        <button class="button  button-framework-test-lit" @click="${this._decrement}">Decrement</button>
                    </div>
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <input type="number" class="input" placeholder="Amount" .value="${this.amount}" @input="${this.handleAmountInput}" />
                            </div>
                            <div class="control">
                                <button class="button  button-framework-test-lit" @click="${this._incrementByAmount}">Increment By Amount</button>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <button class="button  button-framework-test-lit" @click="${this._doubleCount}">Double Count</button>
                    </div>
                    <div class="column">
                        <button class="button  button-framework-test-lit" @click="${this._reset}">Reset</button>
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
