import { waitElementFinishLoading, DetermineWindowPropertyIsLoaded } from '../native/utils/monitoringElement';
import { getElement, createElementWithAttributes } from '../native/utils/elementBasic';
import { httpRequestReturnXML } from '../native/utils/tamperMonkeyFunction';
import { hostname, body, head } from '../native/alias';

export async function someTestActions() {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return;
    const isLoaded = await DetermineWindowPropertyIsLoaded('$');
    const body = await waitElementFinishLoading('body');

    if (!isLoaded && !body) return;

    if (hostname.includes('baidu.com')) {
        updateCssRules(/*css*/ `
            div#s_top_wrap, div#bottom_layer {
                background-color: rgba(0, 0, 0, 0) !important;
            }

            div#s_wrap, div#s-hotsearch-wrapper {
                display: none !important;
            }
            `);
        updateBackgroundImage();
    }

    if (hostname.includes('bing.com')) {
        updateCssRules(/*css*/ `
            div.bottom_row.widget {
                display: none !important;
            }
            `);
    }

    if (hostname.includes('google.com')) {
        updateCssRules(/*css*/ `
            div#gb, div[role="contentinfo"], input[type="submit"] {
                background-color: rgba(0, 0, 0, 0) !important;
            }
            `);
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
    if (backgroundImage) {
        Object.assign(body.style, {
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'round',
        });
    }
}

function updateCssRules(rules: string) {
    const style = createElementWithAttributes('style', {
        props: {
            type: 'text/css',
            innerHTML: rules,
        },
    });
    head.appendChild(style);
}
