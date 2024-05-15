import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { createAppElement, ListeningForChangesInTarget } from './pure/actions/beforeMount';
import { someTestActions } from './examples/testActions';

import { sharedStates } from './bridge/stores/sharedStates';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const beforeMountEvent = async () => {
    if (!location.search && !(location.pathname.length > 1)) await someTestActions();
};

beforeMountEvent();

createAppElement();
app.mount('#app');

const afterMountEvent = () => {
    ListeningForChangesInTarget('#kw', value => (sharedStates.search = value), {
        childList: false,
        subtree: false,
        attributes: true,
    });
};

afterMountEvent();
