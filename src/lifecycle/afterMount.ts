import { windowProxy } from '../common/utils/tamperMonkeyFunction';
import { listenElementChanges } from '../common/utils/monitoringElement';
import type { CommonSelectors } from '../common/interface/element';

export function baidu() {
    const selector: CommonSelectors = {
        tagName: 'input',
        id: 'kw',
    };

    try {
        searchInput(selector);
    } catch (error) {
        console.log(error);
    }
}

export function bing() {
    const selector: CommonSelectors = {
        tagName: 'textarea',
        id: 'sb_form_q',
    };

    try {
        searchInput(selector);
    } catch (error) {
        console.log(error);
    }
}

export function google() {
    const selector: CommonSelectors = {
        tagName: 'textarea',
        id: 'APjFqb',
    };

    try {
        searchInput(selector);
    } catch (error) {
        console.log(error);
    }
}

function searchInput(selector: CommonSelectors) {
    listenElementChanges(selector, {
        callback: value => {
            Object.assign(windowProxy, { scriptTemplate: { search: value || '' } });
            windowProxy.dispatchEvent(new Event('kwChanged'));
        },
        attributesConcern: 'value',
        immediateImplementation: true,
    });
}
