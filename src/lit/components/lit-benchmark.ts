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
            <div>
                <h1>Benchmark</h1>
                <p>Spend Time: ${this.duration} ms</p>
                <div class="container text-center">
                    <div class="row align-items-center">
                        <div class="input-group">
                            <span class="input-group-text">Render Number:</span>
                            <input type="number" class="form-control" placeholder="Input number of divList" .value="${this.count}" @input="${this.handleNumberInput}" />
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._render}">Render</button>
                            <button type="button" class="btn btn-lg btn-framework-test-lit" @click="${this._empty}">Empty</button>
                        </div>
                    </div>
                </div>
                <div class="container text-center">
                    <div class="row align-items-center">${this.benchmarkStore?.divList.map(ds => html`<div class="col-1" style="background-color: ${ds.backgroundColor} !important; color: ${ds.color}; font-size: 8px !important;">Div# ${ds.id}</div>`)}</div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-benchmark': LitBenchmark;
    }
}
