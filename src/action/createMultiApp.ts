import { appendElement, updateElementAttributes } from '../native/utils/elementCRUD';

export function createDivAppElement(id: string[]) {
    id.forEach(el => {
        const div = document.createElement('div');
        const element = updateElementAttributes(div, { props: { id: `${el}App` } });
        appendElement(document.body, element);
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
        const app = updateElementAttributes(script, { props: { src: el, type: module ? 'module' : 'text/javascript' } });
        appendElement(document.head, app);
    });
}
