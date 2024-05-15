import { WaitForTargetTFinishLoading } from '../pure/actions/beforeMount';
import { getElement, createNewElement, removeElement, addElement } from '../pure/actions/manipulateDom';

import { httpRequestReturnXML } from '../pure/actions/tamperMonkeyFunction';

const main = async () => {
    const head = await WaitForTargetTFinishLoading('#head_wrapper');
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
        if (parent) addElement(parent, createNewElement({ name: 'img', id: 's_lg_img', src: 'https://www.tencent.com/img/index/tencent_logo.png' }));
    }
}

function replaceText() {
    const element = getElement('#su');
    if (element) element.setAttribute('value', '阿里一下');
}

async function getResource() {
    return await httpRequestReturnXML('https://www.bytedance.com/', 'GET');
}

export { main };
