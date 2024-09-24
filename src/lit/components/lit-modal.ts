import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { BaseComponent } from '../extends/baseComponents';

import { consume } from '@lit/context';
import { showContext, showStore } from '../context/show-context';

import './lit-vector-image';
import './lit-counter';
import './lit-window-event';
import './lit-benchmark';

@customElement('lit-modal')
export class LitModal extends BaseComponent {
    componentsMap: Record<string, string> = {
        VectorImage: 'lit-vector-image',
        Counter: 'lit-counter',
        WindowEvent: 'lit-window-event',
        Benchmark: 'lit-benchmark',
    };

    @property({ type: String })
    msg!: string;

    @property({ type: String })
    currentView = 'VectorImage';

    tag = this.componentsMap[this.currentView];

    @consume({ context: showContext, subscribe: true })
    public showStore?: showStore;

    _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
        }
    }

    close() {
        this.dispatchEvent(new CustomEvent('show-changed', { detail: false, bubbles: false, composed: true }));
    }

    render() {
        const componentTag = unsafeStatic(this.componentsMap[this.currentView]);
        return html`
            <div class="framework-test-modal-mask" @click="${this._close}">
                <div class="framework-test-modal-container">
                    <span>
                        <button class="framework-test-modal-close-button" @click="${this.close}">&times;</button>
                    </span>
                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-2">
                                <p class="framework-test-header-lit framework-test-heavy">${this.msg}</p>
                                <div class="btn-group-vertical" role="group">
                                    <button type="button" class=${this.currentView === 'VectorImage' ? 'btn btn-framework-test btn-framework-test-lit' : 'btn btn-framework-test'} @click=${() => (this.currentView = 'VectorImage')}>Vector Image</button>
                                    <button type="button" class=${this.currentView === 'Counter' ? 'btn btn-framework-test btn-framework-test-lit' : 'btn btn-framework-test'} @click=${() => (this.currentView = 'Counter')}>Counter</button>
                                    <button type="button" class=${this.currentView === 'WindowEvent' ? 'btn btn-framework-test btn-framework-test-lit' : 'btn btn-framework-test'} @click=${() => (this.currentView = 'WindowEvent')}>Window Event</button>
                                    <button type="button" class=${this.currentView === 'Benchmark' ? 'btn btn-framework-test btn-framework-test-lit' : 'btn btn-framework-test'} @click=${() => (this.currentView = 'Benchmark')}>Benchmark</button>
                                </div>
                            </div>
                            <div class="col-8">${staticHtml`<${componentTag}></${componentTag}>`}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-modal': LitModal;
    }
}
