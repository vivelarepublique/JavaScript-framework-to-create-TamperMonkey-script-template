import { waitElementFinishLoading, DetermineWindowPropertyIsLoaded } from '../native/utils/monitoringElement';
import { getElement } from '../native/utils/elementCRUD';
import { httpRequestReturnXML } from '../native/utils/tamperMonkeyFunction';
import { hostname } from '../native/alias';

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
    const response = await httpRequestReturnXML({ url: 'https://www.bing.com/?toWww=1', method: 'GET' });
    if (!response) return null;
    const background = getElement('div.img_cont', response);
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
    Object.assign(document.body.style, styles);
}
