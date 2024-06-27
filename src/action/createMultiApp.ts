import { appendElement, createNewElement } from '../pure/utils/elementCRUD';

export function createDivAppElement(id: string[]) {
    id.forEach(el => {
        const div = createNewElement('div', { id: `${el}App` });
        appendElement(document.body, div);
    });
}

export function createOtherAppElement(name: string[]) {
    name.forEach(el => {
        const app = createNewElement(el);
        appendElement(document.body, app);
    });
}

export function createScriptElement(path: string[], module?: boolean) {
    path.forEach(el => {
        const app = createNewElement('script', { src: el, type: module ? 'module' : 'text/javascript' });
        appendElement(document.head, app);
    });
}
