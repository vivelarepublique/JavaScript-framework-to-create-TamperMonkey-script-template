import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { BenchmarkStore, benchmarkContext } from '../context/benchmark-context';

import { measureRenderTime } from '../../common/components/benchmark';

@customElement('lit-benchmark')
export class LitBenchmark extends BaseComponent {
    @consume({ context: benchmarkContext, subscribe: true })
    public benchmarkStore?: BenchmarkStore;

    @property({ type: Number })
    duration = 0;

    @property({ type: Number })
    count = 0;

    _empty() {
        this.benchmarkStore?.emptyRandomColorDiv();
        this.requestUpdate();
    }

    _add(count: number) {
        this.benchmarkStore?.addRandomColorDiv(count);
    }

    _updateDuration(time: number) {
        this.duration = time;
    }

    _render() {
        measureRenderTime(
            (renderCount: number) => this._add(renderCount),
            this.count,
            (time: number) => this._updateDuration(time),
        );
        this.requestUpdate();
    }

    handleNumberInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.count = parseInt(target.value);
    }

    render() {
        return html`
            <div class="block">
                <div class="subtitle is-2 header-framework-test-lit">Benchmark, Spend Time: ${this.duration} ms</div>

                <div class="field">
                    <label class="label">Render Number</label>
                    <div class="control">
                        <input type="number" class="input" placeholder="Render Number" .value="${this.count}" @input="${this.handleNumberInput}" />
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-large button-framework-test-lit" @click="${this._render}">Render</button>
                    </div>
                    <div class="control">
                        <button class="button is-large button-framework-test-lit" @click="${this._empty}">Empty</button>
                    </div>
                </div>

                <div class="columns is-multiline">${this.benchmarkStore?.divList.map(ds => html`<div class="column is-1" style="background-color: ${ds.backgroundColor} !important; color: ${ds.color}; font-size: 8px !important;">Div# ${ds.id}</div>`)}</div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-benchmark': LitBenchmark;
    }
}
