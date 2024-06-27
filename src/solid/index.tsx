import { render } from 'solid-js/web';

import App from './App';

export function createSolidApp() {
    render(() => <App />, document.querySelector('#solidApp')!);
}
