import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { createNewElement } from './pure/actions/manipulatingDOM';
import { listeningForChangesInTarget } from './pure/actions/monitoringDOM';
import { someTestActions } from './examples/testActions';

import { sharedStates } from './bridge/stores/sharedStates';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const beforeMountEvent = async () => {
    if (!location.search && !(location.pathname.length > 1)) await someTestActions();
};

beforeMountEvent();

const div = createNewElement({
    name: 'div',
    id: 'app',
});
document.body.insertBefore(div, null);
app.mount('#app');

const afterMountEvent = () => {
    listeningForChangesInTarget('#kw', value => (sharedStates.search = value), {
        childList: false,
        subtree: false,
        attributes: true,
    });
};

afterMountEvent();
