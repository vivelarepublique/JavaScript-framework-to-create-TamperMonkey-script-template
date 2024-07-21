import './styles/global.css';

import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

//@ts-ignore
import { createVueApp } from './vue';
//@ts-ignore
import { createReactApp } from './react';
//@ts-ignore
import { createPreactApp } from './preact';
//@ts-ignore
import { createLitApp } from './lit';
//@ts-ignore
import SvelteApp from './svelte';
//@ts-ignore
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
