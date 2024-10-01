import { listenElementChanges } from '../native/utils/monitoringElement';
import { windowProxy } from '../native/utils/tamperMonkeyFunction';
import { hostname } from '../native/alias';
import type { CommonSelectors } from '../native/interface/element';

export function otherTestActions() {
    switch (hostname) {
        case 'www.baidu.com':
            baidu();
            break;
        case 'www.bing.com':
            bing();
            break;
        case 'www.google.com':
            google();
            break;
    }
}

function baidu() {
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

function bing() {
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

function google() {
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
