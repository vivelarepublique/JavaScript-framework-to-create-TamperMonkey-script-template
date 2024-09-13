import { appendElement, createElementWithAttributes, getElement } from '../native/utils/elementCRUD';
import { ScriptOptions, LinkOptions } from '../native/interface/element';

export function createDivAppElement(id: string | string[]): void {
    Array.isArray(id) ? id.forEach(i => appendElement(document.body, createElementWithAttributes('div', { props: { id: `${i}App` } }))) : appendElement(document.body, createElementWithAttributes('div', { props: { id: `${id}App` } }));
}

export function createAppElement(name: string | string[]): void {
    Array.isArray(name) ? name.forEach(n => appendElement(document.body, createElementWithAttributes(`${n}-app`))) : appendElement(document.body, createElementWithAttributes(`${name}-app`));
}

export function createScriptElement(options: ScriptOptions | ScriptOptions[]): void {
    Array.isArray(options) ? options.forEach(o => appendElement(document.head, createElementWithAttributes('script', { props: o }))) : appendElement(document.head, createElementWithAttributes('script', { props: options }));
}

export function createLinkElement(options: LinkOptions | LinkOptions[]): void {
    Array.isArray(options) ? options.forEach(o => appendElement(document.head, createElementWithAttributes('link', { props: o }))) : appendElement(document.head, createElementWithAttributes('link', { props: options }));
}

export function getMultiDivAppElement(id: string[]): HTMLElement[] {
    return id.map(i => getElement(`div#${i}App`)!);
}
