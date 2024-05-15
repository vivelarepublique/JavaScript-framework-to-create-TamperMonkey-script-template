import './styles/global.css';
import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { createAppElement, ListeningForChangesInTarget } from './pure/actions/beforeMount';
import { main } from './examples/testActions';

import { sharedStates } from './bridge/stores/sharedStates';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const beforeMountEvent = async () => {
    if (!location.search) await main();
};

createAppElement();
beforeMountEvent();

app.mount('#app');

const afterMountEvent = () => {
    ListeningForChangesInTarget('#kw', value => (sharedStates.search = value), {
        childList: false,
        subtree: false,
        attributes: true,
    });
};

afterMountEvent();
