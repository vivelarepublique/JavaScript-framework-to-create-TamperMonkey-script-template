import { waitForTargetFinishLoading } from '../pure/utils/monitoringElement';
import { getElement, createNewElement, removeElement, addElement } from '../pure/utils/elementCRUD';

import { httpRequestReturnXML } from '../pure/utils/tamperMonkeyFunction';

const someTestActions = async () => {
    const head = await waitForTargetFinishLoading('#head_wrapper');
    if (head) {
        replaceImg();
        replaceText();
        const resource = await getResource();
        const description = Array.from(resource?.head.children || [])
            .find(el => el.outerHTML.includes('<meta name="description" content='))
            ?.getAttribute('content');
        document.title = description || '';
    }
};

function replaceImg() {
    const element = getElement('#s_lg_img');
    if (element) {
        const parent = element.parentElement;
        removeElement(element);
        if (parent) addElement(parent, createNewElement('img', { id: 's_lg_img', src: 'https://www.tencent.com/img/index/tencent_logo.png' }));
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
