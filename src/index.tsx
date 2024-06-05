//styles
import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

//vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApp from './App.vue';

//react
import { createRoot } from 'react-dom/client';
import ReactApp from './ReactApp';
import { Provider } from 'react-redux';
import { store } from './react/store';

import { appendElement, createNewElement, getElement } from './pure/utils/elementCRUD';
import { listenElementChanges } from './pure/utils/monitoringElement';
import { someTestActions } from './examples/testActions';

import { sharedState as vueShared } from './shared/vueState/sharedState';
import { sharedState as reactShared } from './shared/reactState/sharedState';

//vue
const vueApp = createApp(VueApp);
const pinia = createPinia();
vueApp.use(pinia);

const beforeMountEvent = async () => {
    if (!location.search && !(location.pathname.length > 1)) await someTestActions();
};

beforeMountEvent();

const vueDiv = createNewElement('div', { id: 'vueApp' });
appendElement(document.body, vueDiv);
vueApp.mount('#vueApp');

const reactDiv = createNewElement('div', { id: 'reactApp' });
appendElement(document.body, reactDiv);
const root = createRoot(getElement('#reactApp')!);
root.render(
    <Provider store={store}>
        <ReactApp />
    </Provider>,
);

const afterMountEvent = () => {
    listenElementChanges('#kw', {
        callback: value => {
            vueShared.search = value || '';
            reactShared.search = value || '';
            window.dispatchEvent(new Event('stateChange'));
        },
        attributesConcern: 'value',
        immediateImplementation: true,
    });
    listenElementChanges('#form', {
        childrenConcern: [{ target: '#s_kw_wrap', action: target => console.log(target, 'changed.', Math.round(Date.now() / 100)) }],
        triggerLimitation: { delay: 1000, way: 'debounce' },
    });
};

afterMountEvent();
