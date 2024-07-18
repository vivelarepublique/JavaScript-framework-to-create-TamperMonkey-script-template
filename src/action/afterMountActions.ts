import { listenElementChanges } from '../native/utils/monitoringElement';

import { sharedState as vueShared } from '../shared/vueState/sharedState';
import { sharedState as reactShared } from '../shared/reactState/sharedState';

const otherTestActions = () => {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

    listenElementChanges('#kw', {
        callback: value => {
            vueShared.search = value || '';
            reactShared.search = value || '';
            window.dispatchEvent(new Event('stateChange'));
        },
        attributesConcern: 'value',
        immediateImplementation: true,
    });
    listenElementChanges('#form', {
        childrenConcern: [{ selector: '#s_kw_wrap', action: target => console.log(target, ' changed.', Math.round(Date.now() / 100)) }],
        triggerLimitation: { delay: 1000, way: 'debounce' },
    });
};

export { otherTestActions };
