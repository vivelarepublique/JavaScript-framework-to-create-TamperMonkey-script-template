import { httpRequestReturnXML } from '../common/utils/tamperMonkeyFunction';
import { getElement, createElementWithAttributes } from '../common/utils/elementBasic';
import { body, head } from '../common/alias';

async function getBackgroundImage() {
    const doc = await httpRequestReturnXML({ url: 'https://www.bing.com/?toWww=1', method: 'GET' });
    if (!doc) return null;
    const background = getElement(
        {
            tagName: 'div',
            className: 'img_cont',
        },
        doc,
    );
    const url = background?.style.backgroundImage?.match(/(?<=").+?(?=")/g)?.[0];
    return url ? `https://www.bing.com/${url}` : null;
}

export async function updateBackgroundImage() {
    const backgroundImage = await getBackgroundImage();
    if (backgroundImage) {
        Object.assign(body.style, {
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'round',
        });
    }
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
