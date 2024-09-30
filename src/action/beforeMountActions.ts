import { waitElementFinishLoading, DetermineWindowPropertyIsLoaded } from '../native/utils/monitoringElement';
import { getElement } from '../native/utils/elementCRUD';
import { httpRequestReturnXML } from '../native/utils/tamperMonkeyFunction';
import { hostname, body } from '../native/alias';

export async function someTestActions() {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return;
    const isLoaded = await DetermineWindowPropertyIsLoaded('$');
    const body = await waitElementFinishLoading('body');

    if (!isLoaded && !body) return;

    if (hostname.includes('baidu.com')) {
        updateBackgroundImage();
    }

    if (hostname.includes('google.com')) {
        updateBackgroundImage();
    }
}

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

async function updateBackgroundImage() {
    const backgroundImage = await getBackgroundImage();
    if (!backgroundImage) return;
    const styles: Partial<CSSStyleDeclaration> = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'round',
    };
    Object.assign(body.style, styles);
}
