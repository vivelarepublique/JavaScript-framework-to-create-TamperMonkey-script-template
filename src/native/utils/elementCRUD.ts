import type { customEventListener } from '../interface/dom';

export function getElement(selector: string, refer?: HTMLElement): HTMLElement | null {
    return refer ? refer.querySelector(selector) : document.querySelector(selector);
}

export function getMultiElement(selector: string, refer?: HTMLElement): HTMLElement[] {
    return Array.from(refer ? refer.querySelectorAll(selector) : document.querySelectorAll(selector));
}

export function removeElement(element: HTMLElement) {
    element.remove();
}

export function appendElement(parent: HTMLElement, child: HTMLElement | string, refer?: HTMLElement) {
    const childNode = typeof child === 'string' ? document.createTextNode(child) : child;
    refer ? parent.insertBefore(childNode, refer) : parent.appendChild(childNode);
}

export function createElementWithAttributes<T extends keyof HTMLElementTagNameMap, U extends keyof HTMLElementDeprecatedTagNameMap>(
    tagName: T | U | string,
    options?: { props?: Partial<HTMLElementTagNameMap[T] | HTMLElementDeprecatedTagNameMap[U] | HTMLElement>; styles?: Partial<CSSStyleDeclaration>; event?: customEventListener<keyof HTMLElementEventMap> | customEventListener<keyof HTMLElementEventMap>[] },
): HTMLElementTagNameMap[T] | HTMLElementDeprecatedTagNameMap[U] | HTMLElement {
    const element = document.createElement(tagName);
    const { props, styles, event } = options || {};
    if (props) {
        Object.assign(element, props);
    }

    if (styles) {
        Object.assign(element.style, styles);
    }

    if (event) {
        Array.isArray(event) ? event.forEach(e => element.addEventListener(e.type, e.listener, e.options)) : element.addEventListener(event.type, event.listener, event.options);
    }

    return element;
}
