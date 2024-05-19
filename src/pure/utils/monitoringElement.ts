import { ActionFunction, DelayOptions, MutationsOptions } from '../entities/mutations';
import { RealElement } from '../entities/dom';
import { getElement } from './elementCRUD';
import { debounce, throttle } from './delayTools';

const listeningForChangesInTarget = (target: string | Element, action: ActionFunction, options?: MutationsOptions, valueOfConcern?: string, immediate?: boolean, triggerLimitation?: DelayOptions) => {
    const { delay, way } = triggerLimitation || { way: 'none', delay: 0 };
    const finalAction = way === 'debounce' ? debounce(action, delay) : way === 'throttle' ? throttle(action, delay) : action;

    const targetElement = target instanceof Element ? target : getElement(target);
    if (!targetElement) return;

    if (immediate) {
        valueOfConcern ? finalAction((targetElement as RealElement)[valueOfConcern]) : finalAction();
    }

    const targetObserver = new MutationObserver(mutations => {
        const mutation = mutations.find(el => el.target === targetElement);
        if (mutation) {
            const element = mutation.target as RealElement;
            if (valueOfConcern && valueOfConcern in element) {
                finalAction(element[valueOfConcern]);
            } else {
                finalAction();
            }
        }
    });

    targetObserver.observe(targetElement, { childList: true, characterData: true, subtree: true, attributes: true, ...options });
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
