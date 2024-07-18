//@ts-ignore
import './styles/global.css';
//@ts-ignore
import './styles/test.less';
//@ts-ignore
import './styles/test.sass';
//@ts-ignore
import './styles/test.styl';

//@ts-ignore
import { createVueApp } from './vue';
//@ts-ignore
import { createReactApp } from './react';
//@ts-ignore
import { someTestActions } from './action/beforeMountActions';
//@ts-ignore
import { otherTestActions } from './action/afterMountActions';
//@ts-ignore
import { createDivAppElement } from './action/createMultiApp';

createDivAppElement(['vue', 'react']);

const beforeMountEvent = async () => await someTestActions();
const afterMountEvent = () => otherTestActions();

beforeMountEvent();

createVueApp();
createReactApp();

afterMountEvent();
