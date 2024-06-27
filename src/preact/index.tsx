import { render } from 'preact';
import { App } from './App';

export function createPreactApp() {
    render(<App />, document.getElementById('preactApp')!);
}
