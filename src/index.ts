import './styles/global.css';

import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

import { createVueApp } from './vue';
import { createReactApp } from './react';
import { createPreactApp } from './preact';

import { someTestActions } from './action/beforeMountActions';
import { otherTestActions } from './action/afterMountActions';
import { createDivAppElement, createOtherAppElement } from './action/createMultiApp';

import { LitApp } from './lit/lit-app';

createDivAppElement(['vue', 'react', 'preact']);

createOtherAppElement(['lit-app']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();
createPreactApp();
new LitApp();

afterMountEvent();
