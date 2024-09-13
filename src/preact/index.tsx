import { render } from 'preact';
import { App } from './App';

import './index.css';

export function createPreact(target: HTMLElement) {
    render(<App />, target);
}
