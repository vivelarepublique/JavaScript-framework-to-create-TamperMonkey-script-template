import type { CommonSelectors, CustomEventListener } from '../interface/element';

export function combineSelectors(selector: CommonSelectors): string {
    const { tagName, id, className, other } = selector;
    const idRes = id ? `#${id}` : '';
    const classNameRes = className ? `.${className.trim().replaceAll(' ', '.')}` : '';

    return `${tagName}${idRes}${classNameRes}${other ? other : ''}`;
}

export function getElement(selector: string | CommonSelectors, refer?: Document): HTMLElement | null {
    if (typeof selector === 'string') {
        return refer ? refer.querySelector(selector) : document.querySelector(selector);
    } else {
        const combinedSelector = combineSelectors(selector);
        return refer ? refer.querySelector(combinedSelector) : document.querySelector(combinedSelector);
    }
}

export function getMultiElement(selector: string | CommonSelectors, refer?: Document): HTMLElement[] {
    if (typeof selector === 'string') {
        return Array.from(refer ? refer.querySelectorAll(selector) : document.querySelectorAll(selector));
    } else {
        const combinedSelector = combineSelectors(selector);
        return Array.from(refer ? refer.querySelectorAll(combinedSelector) : document.querySelectorAll(combinedSelector));
    }
}

export function removeElement(element: HTMLElement | CommonSelectors | string) {
    const elementNode = typeof element === 'string' || !(element instanceof HTMLElement) ? getElement(element) : element;
    elementNode && elementNode.remove();
}

export function appendElement(parent: HTMLElement, child: HTMLElement | string, refer?: HTMLElement) {
    const childNode = typeof child === 'string' ? document.createTextNode(child) : child;
    refer ? parent.insertBefore(childNode, refer) : parent.appendChild(childNode);
}

export function createElementWithAttributes<T extends keyof HTMLElementTagNameMap, U extends keyof HTMLElementDeprecatedTagNameMap>(
    tagName: T | U | string,
    options?: { props?: Partial<HTMLElementTagNameMap[T] | HTMLElementDeprecatedTagNameMap[U] | HTMLElement>; styles?: Partial<CSSStyleDeclaration>; event?: CustomEventListener<keyof HTMLElementEventMap> | CustomEventListener<keyof HTMLElementEventMap>[] },
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
