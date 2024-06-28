import '../src/styles/global.css';

import '../src/styles/test.less';
import '../src/styles/test.sass';
import '../src/styles/test.styl';

import { createVueApp } from '../src/vue';
import { createReactApp } from '../src/react';

import { someTestActions } from '../src/action/beforeMountActions';
import { otherTestActions } from '../src/action/afterMountActions';
import { createDivAppElement } from '../src/action/createMultiApp';

createDivAppElement(['vue', 'react']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();

afterMountEvent();
