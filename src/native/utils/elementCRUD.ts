import { customEvent } from '../interface/dom';

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

export function updateElementAttributes<T extends HTMLElement>(element: T, props?: Partial<T>, styles?: Partial<CSSStyleDeclaration>, event?: customEvent | customEvent[]): T {
    if (props) {
        Object.assign(element, props);
    }

    if (styles) {
        Object.assign(element.style, styles);
    }

    if (event) {
        Array.isArray(event) ? event.forEach(e => element.addEventListener(e.name, e.callback)) : element.addEventListener(event.name, event.callback);
    }

    return element;
}
