import { ActionFunction, MutationsOptions } from '../entities/mutations';
import { RealElement } from '../entities/dom';
import { getElement } from './manipulatingDOM';

const listeningForChangesInTarget = (target: string | Element, action: ActionFunction, valueOfConcern = 'value', options?: MutationsOptions) => {
    const targetElement = target instanceof Element ? target : getElement(target);

    if (targetElement) {
        const targetObserver = new MutationObserver(mutations => {
            const mutation = mutations.find(el => el.target === targetElement);
            if (mutation) {
                const element = mutation.target as RealElement;
                if (valueOfConcern in element) action(element[valueOfConcern]);
            }
        });

        targetObserver.observe(targetElement, { childList: true, characterData: true, subtree: true, attributes: true, ...options });
    }
};

const waitForTargetFinishLoading = (target: string): Promise<Element> => {
    return new Promise(resolve => {
        const bodyObserver = new MutationObserver(_ => {
            const targetElement = getElement(target);
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

export { listeningForChangesInTarget, waitForTargetFinishLoading };
