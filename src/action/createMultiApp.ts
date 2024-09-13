import { appendElement, createElementWithAttributes, getElement } from '../native/utils/elementCRUD';
import { ScriptOptions, LinkOptions } from '../native/interface/element';

const body = document.body;
const head = document.head;
const isArr = Array.isArray;

export function createDivAppElement(id: string | string[]): void {
    isArr(id) ? id.forEach(i => appendElement(body, createElementWithAttributes('div', { props: { id: `${i}App` } }))) : appendElement(body, createElementWithAttributes('div', { props: { id: `${id}App` } }));
}

export function createAppElement(name: string | string[]): void {
    isArr(name) ? name.forEach(n => appendElement(body, createElementWithAttributes(`${n}-app`))) : appendElement(body, createElementWithAttributes(`${name}-app`));
}

export function createScriptElement(options: ScriptOptions | ScriptOptions[]): void {
    isArr(options) ? options.forEach(o => appendElement(head, createElementWithAttributes('script', { props: o }))) : appendElement(head, createElementWithAttributes('script', { props: options }));
}

export function createLinkElement(options: LinkOptions | LinkOptions[]): void {
    isArr(options) ? options.forEach(o => appendElement(head, createElementWithAttributes('link', { props: o }))) : appendElement(head, createElementWithAttributes('link', { props: options }));
}

export function getMultiDivAppElement(id: string[]): HTMLElement[] {
    return id.map(i => getElement(`div#${i}App`)!);
}
