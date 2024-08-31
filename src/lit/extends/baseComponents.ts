import { LitElement, CSSResult } from 'lit';

export class BaseComponent extends LitElement {
    static styles: CSSResult;
    connectedCallback() {
        super.connectedCallback();

        if ((this.constructor as typeof BaseComponent).styles) {
            const style = document.createElement('style');
            style.textContent = (this.constructor as typeof BaseComponent).styles.cssText;
            this.appendChild(style);
        }
    }

    createRenderRoot() {
        return this;
    }
}
