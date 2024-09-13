import { waitElementFinishLoading, DetermineWindowPropertyIsLoaded } from '../native/utils/monitoringElement';
import { getElement, createElementWithAttributes, removeElement, appendElement } from '../native/utils/elementCRUD';

import { httpRequestReturnXML } from '../native/utils/tamperMonkeyFunction';

const someTestActions = async () => {
    if (!location.search && location.pathname.length <= 1) {
        const isLoaded = await DetermineWindowPropertyIsLoaded('$');
        const head = await waitElementFinishLoading('#head_wrapper');

        const resource = await getResource();
        console.log(resource);

        if (head && isLoaded) {
            replaceImg();
            replaceText();

            const description = Array.from(resource?.head.children || [])
                .find(el => el.outerHTML.includes('<meta name="description" content='))
                ?.getAttribute('content');
            document.title = description || '';
        }
    }
};

function replaceImg() {
    const element = getElement('#s_lg_img');
    if (element) {
        const parent = element.parentElement;
        removeElement(element);

        if (parent) {
            const element = createElementWithAttributes('img', {
                props: { id: 's_lg_img', src: 'https://www.tencent.com/img/index/tencent_logo.png' },
                styles: { width: '336px', height: '44px' },
                event: {
                    type: 'click',
                    listener: () => console.log('click'),
                },
            });
            appendElement(parent, element);
        }
    }
}

function replaceText() {
    const element = getElement('#su');
    if (element) element.setAttribute('value', '阿里一下');
}

async function getResource() {
    return await httpRequestReturnXML({ url: 'https://www.bytedance.com/', method: 'GET' });
}

export { someTestActions };
