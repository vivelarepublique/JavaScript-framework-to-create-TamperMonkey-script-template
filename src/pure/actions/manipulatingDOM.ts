import { customEvent, ElementProperties } from '../entities/dom';

const getElement = (selector: string): Element | null => {
    return document.querySelector(selector);
};

const getMultiElement = (selector: string): NodeListOf<Element> => {
    return document.querySelectorAll(selector);
};

const removeElement = (element: Element) => {
    element.remove();
};

const addElement = (parent: Element, child: Element | string, refer?: Element) => {
    const childNode = typeof child === 'string' ? document.createTextNode(child) : child;
    refer ? parent.insertBefore(childNode, refer) : parent.appendChild(childNode);
};

const createNewElement = (name: string, props: ElementProperties = { id: '', alt: '', className: '', type: '', textContent: '', html: '', src: '', href: '', disabled: false, value: '', rel: '' }, styles?: Partial<CSSStyleDeclaration>, event?: customEvent) => {
    const node = document.createElement(name);
    if (props.id) node.id = props.id;
    if (props.alt) node.setAttribute('alt', props.alt);
    if (props.className) node.className = props.className;
    if (props.type) node.setAttribute('type', props.type);
    if (props.textContent) node.textContent = props.textContent;
    if (props.html) node.innerHTML = props.html;
    if (props.disabled) node.setAttribute('disabled', props.disabled.toString());
    if (props.src) node.setAttribute('src', props.src);
    if (props.href) node.setAttribute('href', props.href);
    if (props.value) node.setAttribute('value', props.value);
    if (props.rel) node.setAttribute('rel', props.rel);

    if (styles) Object.assign(node.style, styles);

    if (event) node.addEventListener(event.name, event.callback);

    return node;
};

export { getElement, getMultiElement, removeElement, addElement, createNewElement };
