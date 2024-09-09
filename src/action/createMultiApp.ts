import { appendElement, updateElementAttributes } from '../native/utils/elementCRUD';

export function createDivAppElement(id: string[]) {
    id.forEach(el => {
        const element = document.createElement('div');
        const div = updateElementAttributes(element, { id: `${el}App` });
        appendElement(document.body, div);
    });
}

export function createOtherAppElement(name: string[]) {
    name.forEach(el => {
        const element = document.createElement(el);
        const app = updateElementAttributes(element);
        appendElement(document.body, app);
    });
}

export function createScriptElement(path: string[], module?: boolean) {
    path.forEach(el => {
        const script = document.createElement('script');
        const app = updateElementAttributes(script, { src: el, type: module ? 'module' : 'text/javascript' });
        appendElement(document.head, app);
    });
}
