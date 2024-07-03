import { render } from 'preact';
import { App } from './App';

import './index.css';

export function createPreactApp() {
    render(<App />, document.getElementById('preactApp')!);
}
