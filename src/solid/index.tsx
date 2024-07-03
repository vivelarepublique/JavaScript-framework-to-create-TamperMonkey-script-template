import { render } from 'solid-js/web';
import './index.css';

import App from './App';

export function createSolidApp() {
    render(() => <App />, document.querySelector('#solidApp')!);
}
