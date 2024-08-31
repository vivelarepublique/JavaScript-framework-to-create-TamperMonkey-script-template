import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { BaseComponent } from '../extends/baseComponents';

@customElement('lit-bridge')
export class LitBridge extends BaseComponent {
    constructor() {
        super();
        unsafeWindow.addEventListener('kwChanged', () => {
            //@ts-ignore
            this.sharedState.search = unsafeWindow.scriptTemplate?.search || '';
        });
    }

    @property({ type: { search: String } })
    sharedState = {
        // @ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    };

    render() {
        return html` <div>
            <h1>Bridge</h1>
            <p>Value: ${this.sharedState.search}</p>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-bridge': LitBridge;
    }
}
