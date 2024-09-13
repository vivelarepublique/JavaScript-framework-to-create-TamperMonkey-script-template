import { listenElementChanges } from '../native/utils/monitoringElement';
import { windowProxy } from '../native/utils/tamperMonkeyFunction';

export function otherTestActions() {
    listenElementChanges('#kw', {
        callback: value => {
            Object.assign(windowProxy, { scriptTemplate: { search: value || '' } });
            windowProxy.dispatchEvent(new Event('kwChanged'));
        },
        attributesConcern: 'value',
        immediateImplementation: true,
    });
    listenElementChanges('#form', {
        childrenConcern: [{ selector: '#s_kw_wrap', action: target => console.log(target, ' changed.', Math.round(Date.now() / 100)) }],
        triggerLimitation: { delay: 1000, way: 'debounce' },
    });
}
