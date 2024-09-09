import { waitElementFinishLoading, DetermineWindowPropertyIsLoaded } from '../native/utils/monitoringElement';
import { getElement, updateElementAttributes, removeElement, appendElement } from '../native/utils/elementCRUD';

import { httpRequestReturnXML } from '../native/utils/tamperMonkeyFunction';

const someTestActions = async () => {
    if (!location.search && location.pathname.length <= 1) {
        const isLoaded = await DetermineWindowPropertyIsLoaded('$');
        const head = await waitElementFinishLoading('#head_wrapper');

        if (head && isLoaded) {
            replaceImg();
            replaceText();
            const resource = await getResource();
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

        const img = document.createElement('img');
        if (parent) appendElement(parent, updateElementAttributes(img, { id: 's_lg_img', src: 'https://www.tencent.com/img/index/tencent_logo.png' }));
    }
}

function replaceText() {
    const element = getElement('#su');
    if (element) element.setAttribute('value', '阿里一下');
}

async function getResource() {
    return await httpRequestReturnXML('https://www.bytedance.com/', 'GET');
}

export { someTestActions };
