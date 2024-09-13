import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

@customElement('lit-window-event')
export class LitWindowEvent extends BaseComponent {
    constructor() {
        super();
        windowProxy.addEventListener('kwChanged', () => {
            this.sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    }

    @property({ type: { search: String } })
    sharedState = {
        search: windowProxy.scriptTemplate?.search || '',
    };

    render() {
        return html` <div>
            <h1>Window Event Test</h1>
            <p>Value: ${this.sharedState.search}</p>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-window-event': LitWindowEvent;
    }
}
