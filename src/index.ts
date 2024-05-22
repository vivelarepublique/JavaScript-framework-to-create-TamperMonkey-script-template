import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { appendElement, createNewElement } from './pure/utils/elementCRUD';
import { listenElementChanges } from './pure/utils/monitoringElement';
import { someTestActions } from './examples/testActions';

import { sharedStates } from './bridge/stores/sharedStates';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const beforeMountEvent = async () => {
    if (!location.search && !(location.pathname.length > 1)) await someTestActions();
};

beforeMountEvent();

const div = createNewElement('div', { id: 'app' });
appendElement(document.body, div);
app.mount('#app');

const afterMountEvent = () => {
    listenElementChanges('#kw', {
        callback: value => (sharedStates.search = value || ''),
        attributesConcern: 'value',
        immediateImplementation: true,
    });
    listenElementChanges('#form', {
        childrenConcern: [{ target: '#s_kw_wrap', action: target => console.log(target, 'changed.', Math.round(Date.now() / 100)) }],
        triggerLimitation: { delay: 1000, way: 'debounce' },
    });
};

afterMountEvent();
