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

const createNewElement = (props: NewElement = { name: 'div', id: '', className: '', text: '', html: '', styles: '', src: '', href: '' }) => {
    const node = document.createElement(props.name);
    if (props.id) node.id = props.id;
    if (props.className) node.className = props.className;
    if (props.text) node.textContent = props.text;
    if (props.html) node.innerHTML = props.html;
    if (props.src) node.setAttribute('src', props.src);
    if (props.href) node.setAttribute('href', props.href);
    if (props.styles) node.style.cssText = props.styles;
    return node;
};

export { getElement, getMultiElement, removeElement, addElement, createNewElement };
