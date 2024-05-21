import { ListenOptions } from '../entities/mutations';
import { RealElement } from '../entities/dom';
import { getElement } from './elementCRUD';
import { debounce, throttle } from './delayTools';
import { windowProxy } from './tamperMonkeyFunction';

const listeningForChangesInTarget = (target: string | Element, options: ListenOptions): MutationObserver | undefined => {
    const { callback, attributesConcern, childrenConcern = [], immediateImplementation = false, triggerLimitation = { way: 'none', delay: 0 }, manualSetupOptions } = options;

    const { delay, way } = triggerLimitation;
    const finalAction = way === 'debounce' ? debounce(callback, delay) : way === 'throttle' ? throttle(callback, delay) : callback;

    const targetElement = target instanceof Element ? target : getElement(target);
    if (!targetElement) return;

    if (immediateImplementation) {
        attributesConcern ? callback((targetElement as RealElement)[attributesConcern]) : callback();
    }

    const targetObserver = new MutationObserver(mutations => {
        childrenConcern.forEach(child => {
            const childMutation = mutations.find(el => el.target === getElement(child));
            if (childMutation) finalAction(childMutation);
        });

        const attributesMutation = mutations.find(el => el.target === targetElement);
        if (attributesMutation) {
            const element = attributesMutation.target as RealElement;
            attributesConcern && attributesConcern in element ? finalAction(element[attributesConcern]) : finalAction();
        }
    });

    targetObserver.observe(targetElement, { childList: childrenConcern.length > 0, attributes: !!attributesConcern || childrenConcern.length > 0, subtree: childrenConcern.length > 0, ...manualSetupOptions });
    return targetObserver;
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

const waitForWindowPropertiesFinishLoading = (target: string): Promise<any> => {
    return new Promise(resolve => {
        windowProxy.addEventListener('load', () => {
            if (windowProxy[target as unknown as number]) {
                resolve(windowProxy[target as unknown as number]);
            }
        });
    });
};

export { listeningForChangesInTarget, waitForTargetFinishLoading, waitForWindowPropertiesFinishLoading };
