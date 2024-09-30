import { listenElementChanges } from '../native/utils/monitoringElement';
import { getElement, getMultiElement, removeElement } from '../native/utils/elementCRUD';
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
    updateElementBackgroundColor(
        [
            {
                tagName: 'div',
                className: 's_top_wrap',
            },
            {
                tagName: 'div',
                className: 'bottom_layer',
            },
        ],
        'rgba(0, 0, 0, 0)',
    );
    removeElement({
        tagName: 'div',
        id: 's-hotsearch-wrapper',
    });

    const selector: CommonSelectors = {
        tagName: 'input',
        id: 'kw',
    };

    try {
        listenElementChanges(selector, {
            callback: value => {
                Object.assign(windowProxy, { scriptTemplate: { search: value || '' } });
                windowProxy.dispatchEvent(new Event('kwChanged'));
            },
            attributesConcern: 'value',
            immediateImplementation: true,
        });
    } catch (error) {
        console.log(error);
    }
}

function bing() {
    const selector: CommonSelectors = {
        tagName: 'div',
        className: 'bottom_row widget',
    };
    try {
        listenElementChanges(selector, {
            callback: () => removeBottomInformationBar(selector),
            immediateImplementation: true,
            anyMutation: true,
        });
    } catch (error) {
        console.log(error);
    }
}

function google() {
    updateElementBackgroundColor(
        [
            {
                tagName: 'div',
                className: 'gb',
            },
            {
                tagName: 'div',
                other: '[role="contentinfo"]',
            },
            {
                tagName: 'input',
                other: '[type="submit"]',
            },
        ],
        'rgba(0, 0, 0, 0)',
    );
}

function removeBottomInformationBar(selector: string | CommonSelectors) {
    const target = getElement(selector);
    if (target) {
        target.innerHTML = '';
    }
}

function updateElementBackgroundColor(selectors: string[] | CommonSelectors[], color: string) {
    selectors.forEach(selector => {
        const elements = getMultiElement(selector);
        elements.forEach(element => {
            const style: Partial<CSSStyleDeclaration> = {
                backgroundColor: color,
            };
            Object.assign(element.style, style);
        });
    });
}
