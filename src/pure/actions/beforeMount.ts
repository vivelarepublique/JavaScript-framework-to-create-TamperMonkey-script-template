import { createNewElement } from './manipulateDom';
import { ActionFunction, MutationsOptions } from '../entities/mutations';

const createAppElement = () => {
    const div = createNewElement({
        name: 'div',
        id: 'app',
    });
    document.body.insertBefore(div, null);
};

const ListeningForChangesInTarget = (target: string, action: ActionFunction, options: MutationsOptions = { childList: true, subtree: true, attributes: true }): boolean => {
    const targetElement = document.querySelector(target);

    const targetObserver = new MutationObserver(mutations => {
        const mutation = mutations.find(el => el.target === targetElement);
        if (mutation) {
            const element = mutation.target as Element;
            if ('value' in element) action((element.value as string) || '');
        }
    });
    if (!targetElement) return false;
    targetObserver.observe(targetElement, {
        childList: options.childList,
        subtree: options.subtree,
        attributes: options.attributes,
    });
    return true;
};

const WaitForTargetTFinishLoading = (target: string): Promise<Element> => {
    return new Promise(resolve => {
        const bodyObserver = new MutationObserver(_ => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                bodyObserver.disconnect();
                resolve(targetElement);
            }
        });
        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};

export { createAppElement, ListeningForChangesInTarget, WaitForTargetTFinishLoading };
