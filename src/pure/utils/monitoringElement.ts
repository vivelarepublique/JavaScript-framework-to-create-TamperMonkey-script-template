import { ListenOptions } from '../types/mutations';
import { RealElement } from '../types/dom';
import { getElement } from './elementCRUD';
import { debounce, throttle } from './delayTools';
import { windowProxy } from './tamperMonkeyFunction';

const listenElementChanges = (target: string | Element, options: ListenOptions): MutationObserver | undefined => {
    const { callback = () => {}, attributesConcern, childrenConcern = [], immediateImplementation = false, noTarget = false, triggerLimitation = { way: 'none', delay: 0 }, manualSetupOptions } = options;

    const { delay, way } = triggerLimitation;
    const finalAction = way === 'debounce' ? debounce(callback, delay) : way === 'throttle' ? throttle(callback, delay) : callback;

    const targetElement = target instanceof Element ? target : getElement(target);
    if (!targetElement) return;

    if (immediateImplementation) {
        attributesConcern ? callback((targetElement as RealElement)[attributesConcern]) : callback();
    }
    const children = childrenConcern.map(({ target, action }) => {
        return {
            target,
            action: way === 'debounce' ? debounce(action, delay) : way === 'throttle' ? throttle(action, delay) : action,
        };
    });

    const targetObserver = new MutationObserver(mutations => {
        children.forEach(child => {
            if (noTarget) {
                child.action();
            } else {
                const childMutation = mutations.find(el => el.target === getElement(child.target));
                if (childMutation) child.action(childMutation.target);
            }
        });

        const attributesMutation = mutations.find(el => el.target === targetElement);
        if (attributesMutation) {
            const element = attributesMutation.target as RealElement;
            attributesConcern && attributesConcern in element ? finalAction(element[attributesConcern]) : finalAction();
        }
    });

    targetObserver.observe(targetElement, { childList: childrenConcern.length > 0, attributes: !!attributesConcern, subtree: childrenConcern.length > 0, ...manualSetupOptions });
    return targetObserver;
};

const waitElementFinishLoading = (target: string): Promise<Element> => {
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

const waitWindowProperties = (target: string): Promise<any> => {
    return new Promise(resolve => {
        windowProxy.addEventListener('load', () => {
            if (windowProxy[target as unknown as number]) {
                resolve(windowProxy[target as unknown as number]);
            }
        });
    });
};

export { listenElementChanges, waitElementFinishLoading, waitWindowProperties };
