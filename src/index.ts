import './styles/global.css';
import '../node_modules/ress/dist/ress.min.css';

import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

import { createVue } from './vue';
import { createReact } from './react';

import { createPreact } from './preact';
import { createLit } from './lit';
import { createSvelte } from './svelte';
import { createSolid } from './solid';

import { someTestActions } from './action/beforeMountActions';
import { otherTestActions } from './action/afterMountActions';
import { createDivAppElement, createAppElement, getMultiDivAppElement } from './action/createMultiApp';

createDivAppElement(['vue', 'react', 'preact', 'svelte', 'solid']);
createAppElement('lit');
const [vue, react, preact, svelte, solid] = getMultiDivAppElement(['vue', 'react', 'preact', 'svelte', 'solid']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVue(vue);
createReact(react);

createPreact(preact);
createLit();
createSvelte(svelte);
createSolid(solid);

afterMountEvent();
