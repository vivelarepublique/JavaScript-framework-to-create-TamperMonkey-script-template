import type { ElementAttributeOptions, ElementType, CommonSelectors } from '../interface/element';

export function combineSelectors(selector: CommonSelectors): string {
    const { tagName, id, className, other } = selector;
    const idRes = id ? `#${id}` : '';
    const classNameRes = className ? `.${className.trim().replaceAll(' ', '.')}` : '';

    return `${tagName}${idRes}${classNameRes}${other || ''}`;
}

export function getElement(selector: string | CommonSelectors, refer?: Document): HTMLElement | null {
    const flag = refer instanceof Document;
    if (typeof selector === 'string') {
        return flag ? refer.querySelector(selector) : document.querySelector(selector);
    } else {
        const combinedSelector = combineSelectors(selector);
        return flag ? refer.querySelector(combinedSelector) : document.querySelector(combinedSelector);
    }
}

export function getMultiElement(selector: string | CommonSelectors, refer?: Document): HTMLElement[] {
    const flag = refer instanceof Document;
    if (typeof selector === 'string') {
        return Array.from(flag ? refer.querySelectorAll(selector) : document.querySelectorAll(selector));
    } else {
        const combinedSelector = combineSelectors(selector);
        return Array.from(flag ? refer.querySelectorAll(combinedSelector) : document.querySelectorAll(combinedSelector));
    }
}

export function removeElement(element: HTMLElement | CommonSelectors | string) {
    const elementNode = typeof element === 'string' || !(element instanceof HTMLElement) ? getElement(element) : element;
    elementNode && elementNode.remove();
}

export function appendElement(parent: HTMLElement, child: HTMLElement | string, refer?: HTMLElement) {
    const childNode = typeof child === 'string' ? document.createTextNode(child) : child;
    refer instanceof HTMLElement ? parent.insertBefore(childNode, refer) : parent.appendChild(childNode);
}

export function updateElementAttribute<T extends keyof HTMLElementTagNameMap, D extends keyof HTMLElementDeprecatedTagNameMap>(element: HTMLElement, options?: ElementAttributeOptions<T, D>): ElementType<T, D> {
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

export function createElementWithAttributes<T extends keyof HTMLElementTagNameMap, D extends keyof HTMLElementDeprecatedTagNameMap>(tagName: T | D | string, options?: ElementAttributeOptions<T, D>): ElementType<T, D> {
    const element = document.createElement(tagName);
    return updateElementAttribute(element, options);
}
