import { httpRequest } from '../common/utils/tamperMonkeyFunction';
import { getElement, createElementWithAttributes } from '../common/utils/elementBasic';
import { body, head } from '../common/alias';

async function getBackgroundImageURL() {
    const doc = await httpRequest({ url: 'https://www.bing.com/?toWww=1', method: 'GET' });
    if (!doc) return '';

    const background = getElement(
        {
            tagName: 'div',
            className: 'img_cont',
        },
        doc,
    );
    const url = background?.style.backgroundImage?.match(/(?<=").+?(?=")/g)?.[0];
    return url ? `https://www.bing.com/${url}` : '';
}

export async function updateBackgroundImage() {
    const backgroundImageURL = await getBackgroundImageURL();
    Object.assign(body.style, {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundRepeat: 'round',
    });
}

export function updateCssRules(rules: string) {
    const style = createElementWithAttributes('style', {
        props: {
            type: 'text/css',
            innerHTML: rules,
        },
    });
    head.appendChild(style);
}
