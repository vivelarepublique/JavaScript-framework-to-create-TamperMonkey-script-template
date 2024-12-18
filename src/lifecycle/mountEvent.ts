import { waitElementFinishLoading, determineWindowPropertyIsLoaded } from '../common/utils/monitoringElement';
import { updateCssRules, updateBackgroundImage } from './beforeMount';
import { baidu, bing, google, urlChangeEvent } from './afterMount';
import { hostname, search } from '../common/alias';

export async function beforeMountEvent() {
    const init = await Promise.race([determineWindowPropertyIsLoaded('$'), waitElementFinishLoading({ tagName: 'body' })]);

    console.log(init);
    if (!init) return;

    if (hostname.includes('baidu.com')) {
        updateCssRules(/*css*/ `
            div#s_top_wrap,
            div#bottom_layer {
                background-color: rgba(0, 0, 0, 0) !important;
            }

            div#s_wrap,
            div#s-hotsearch-wrapper {
                display: none !important;
            }
            `);
    }

    if (hostname.includes('bing.com')) {
        updateCssRules(/*css*/ `
            div.bottom_row.widget {
                display: none !important;
            }
            `);
    } else {
        if (!search) updateBackgroundImage();
    }

    if (hostname.includes('google.com')) {
        updateCssRules(/*css*/ `
            div#gb,
            div[role="contentinfo"], input[type="submit"] {
                background-color: rgba(0, 0, 0, 0) !important;
            }
            `);
    }
}

export function afterMountEvent() {
    urlChangeEvent();

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
