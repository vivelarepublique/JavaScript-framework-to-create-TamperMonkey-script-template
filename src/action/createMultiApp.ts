import { appendElement, createElementWithAttributes } from '../native/utils/elementCRUD';

export function createDivAppElement(id: string[]) {
    id.forEach(el => {
        const element = createElementWithAttributes('div', { props: { id: `${el}App` } });
        appendElement(document.body, element);
    });
}

export function createOtherAppElement(name: string[]) {
    name.forEach(el => {
        const app = createElementWithAttributes(el);
        appendElement(document.body, app);
    });
}

export function createScriptElement(path: string[], module?: boolean) {
    path.forEach(el => {
        const app = createElementWithAttributes('script', { props: { src: el, type: module ? 'module' : 'text/javascript' } });
        appendElement(document.head, app);
    });
}
