import { appendElement, createElementWithAttributes, getElement } from '../native/utils/elementCRUD';

export function createDivAppElement(id: string[]) {
    id.forEach(el => {
        const element = createElementWithAttributes('div', { props: { id: `${el}App` } });
        appendElement(document.body, element);
    });
}

export function createAppElement(name: string[]) {
    name.forEach(el => {
        const app = createElementWithAttributes(`${el}-app`);
        appendElement(document.body, app);
    });
}

export function createScriptElement(path: string[], module?: boolean) {
    path.forEach(el => {
        const app = createElementWithAttributes('script', { props: { src: el, type: module ? 'module' : 'text/javascript' } });
        appendElement(document.head, app);
    });
}

export function getMultiDivAppElement(id: string[]): HTMLElement[] {
    return id.map(i => getElement(`div#${i}App`)!);
}
