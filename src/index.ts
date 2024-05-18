import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { addElement, createNewElement } from './pure/utils/elementCRUD';
import { listeningForChangesInTarget } from './pure/utils/monitoringElement';
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
addElement(document.body, div);
app.mount('#app');

const afterMountEvent = () => {
    listeningForChangesInTarget('#kw', value => (sharedStates.search = value || ''), { childList: false, subtree: false }, 'value');
};

afterMountEvent();
