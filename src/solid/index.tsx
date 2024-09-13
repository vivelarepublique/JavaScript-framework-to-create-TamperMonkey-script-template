import { render } from 'solid-js/web';
import './index.css';

import App from './App';

export function createSolid(target: HTMLElement) {
    render(() => <App />, target);
}
