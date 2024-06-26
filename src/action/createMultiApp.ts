import { appendElement, createNewElement } from '../pure/utils/elementCRUD';

export function createMultiApp(name: string[]) {
    name.forEach(el => {
        const div = createNewElement('div', { id: `${el}App` });
        appendElement(document.body, div);
    });
}
