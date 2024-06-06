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
import { someTestActions } from './action/beforeMountActions';
import { otherTestActions } from './action/afterMountActions';

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

//vue
const vueDiv = createNewElement('div', { id: 'vueApp' });
appendElement(document.body, vueDiv);
const vueApp = createApp(VueApp);
const pinia = createPinia();
vueApp.use(pinia);
vueApp.mount('#vueApp');

//react
const reactDiv = createNewElement('div', { id: 'reactApp' });
appendElement(document.body, reactDiv);
const root = createRoot(getElement('#reactApp')!);
root.render(
    <Provider store={store}>
        <ReactApp />
    </Provider>,
);

afterMountEvent();
