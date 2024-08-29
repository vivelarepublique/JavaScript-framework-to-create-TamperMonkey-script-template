import { listenElementChanges } from '../native/utils/monitoringElement';

const otherTestActions = () => {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

    listenElementChanges('#kw', {
        callback: value => {
            Object.assign(unsafeWindow, { scriptTemplate: { search: value || '' } });
            unsafeWindow.dispatchEvent(new Event('kwChanged'));
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
