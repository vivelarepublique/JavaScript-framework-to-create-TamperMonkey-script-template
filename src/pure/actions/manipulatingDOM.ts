import { NewElement } from '../entities/dom';

const getElement = (selector: string): Element | null => {
    return document.querySelector(selector);
};

const getMultiElement = (selector: string): NodeListOf<Element> | null => {
    return document.querySelectorAll(selector);
};

const removeElement = (element: Element) => {
    element.remove();
};

const addElement = (target: Element, element: Element) => {
    target.appendChild(element);
};

const createNewElement = (props: NewElement = { name: 'div', id: '', alt: '', className: '', type: '', styles: '', text: '', html: '', src: '', href: '', disabled: false, value: '', rel: '' }) => {
    const node = document.createElement(props.name);
    if (props.id) node.id = props.id;
    if (props.alt) node.setAttribute('alt', props.alt);
    if (props.className) node.className = props.className;
    if (props.type) node.setAttribute('type', props.type);
    if (props.text) node.textContent = props.text;
    if (props.html) node.innerHTML = props.html;
    if (props.disabled) node.setAttribute('disabled', props.disabled.toString());
    if (props.src) node.setAttribute('src', props.src);
    if (props.href) node.setAttribute('href', props.href);
    if (props.value) node.setAttribute('value', props.value);
    if (props.rel) node.setAttribute('rel', props.rel);
    if (props.styles) node.style.cssText = props.styles;
    return node;
};

export { getElement, getMultiElement, removeElement, addElement, createNewElement };
