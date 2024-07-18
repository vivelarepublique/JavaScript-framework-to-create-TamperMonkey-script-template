//@ts-ignore
import './src/styles/global.css';
//@ts-ignore
import './src/styles/test.less';
//@ts-ignore
import './src/styles/test.sass';
//@ts-ignore
import './src/styles/test.styl';

//@ts-ignore
import { createVueApp } from './src/vue';
//@ts-ignore
import { createReactApp } from './src/react';
//@ts-ignore
import { someTestActions } from './src/action/beforeMountActions';
//@ts-ignore
import { otherTestActions } from './src/action/afterMountActions';
//@ts-ignore
import { createDivAppElement } from './src/action/createMultiApp';

createDivAppElement(['vue', 'react']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();

afterMountEvent();
