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
            <div>
                <h1>Counter</h1>
                <div class="alert alert-dark" role="alert">Count: ${this.counterStore?.count}</div>
                <div class="container text-center">
                    <div class="row align-items-end">
                        <div class="col-2">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._increment}">Increment</button>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._decrement}">Decrement</button>
                        </div>
                        <div class="col-4">
                            <div class="input-group">
                                <input type="number" class="form-control" placeholder="Amount" .value="${this.amount}" @input="${this.handleAmountInput}" />
                                <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._incrementByAmount}">Increment By Amount</button>
                            </div>
                        </div>
                        <div class="col-3">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._doubleCount}">Double Count</button>
                        </div>
                        <div class="col-1">
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._reset}">Reset</button>
                        </div>
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
