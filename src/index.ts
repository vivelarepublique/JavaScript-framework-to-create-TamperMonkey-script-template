import './styles/global.css';
import '../node_modules/ress/dist/ress.min.css';

import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

import { createVueApp } from './vue';
import { createReactApp } from './react';
import { createPreactApp } from './preact';
import { createLitApp } from './lit';
import SvelteApp from './svelte';
import { createSolidApp } from './solid';

import { someTestActions } from './action/beforeMountActions';
import { otherTestActions } from './action/afterMountActions';
import { createDivAppElement, createOtherAppElement } from './action/createMultiApp';

createDivAppElement(['vue', 'react', 'preact', 'svelte', 'solid']);

createOtherAppElement(['lit-app']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();

createPreactApp();
createLitApp();
export default new SvelteApp({
    target: document.querySelector('#svelteApp')!,
});
createSolidApp();

afterMountEvent();
