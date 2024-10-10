import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

import { windowProxy } from '../../common/utils/tamperMonkeyFunction';

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
        return html` <div class="block">
            <div class="subtitle is-2 header-framework-test-lit">Window Event, Value is ${this.sharedState.search}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-window-event': LitWindowEvent;
    }
}
