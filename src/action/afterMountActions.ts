import { listenElementChanges } from '../native/utils/monitoringElement';
import { getElement } from '../native/utils/elementCRUD';
import { windowProxy } from '../native/utils/tamperMonkeyFunction';
import { hostname } from '../native/alias';

export function otherTestActions() {
    if (hostname.includes('baidu.com')) {
        const kw = getElement('#kw');
        if (kw) {
            listenElementChanges('#kw', {
                callback: value => {
                    Object.assign(windowProxy, { scriptTemplate: { search: value || '' } });
                    windowProxy.dispatchEvent(new Event('kwChanged'));
                },
                attributesConcern: 'value',
                immediateImplementation: true,
            });
        }
    }

    if (hostname.includes('bing.com')) {
        const widget = getElement('div.bottom_row.widget');
        if (widget) {
            listenElementChanges('div.bottom_row.widget', {
                callback: () => removeBottomInformationBar(),
                immediateImplementation: true,
                anyMutation: true,
            });
        }
    }
}

function removeBottomInformationBar() {
    const widget = getElement('div.bottom_row.widget');
    if (widget) {
        widget.innerHTML = '';
    }
}
