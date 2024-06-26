import './styles/global.css';

import './styles/test.less';
import './styles/test.sass';
import './styles/test.styl';

import { createVueApp } from './vue';
import { createReactApp } from './react';

import { someTestActions } from './action/beforeMountActions';
import { otherTestActions } from './action/afterMountActions';
import { createMultiApp } from './action/createMultiApp';

createMultiApp(['vue', 'react']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();

afterMountEvent();
