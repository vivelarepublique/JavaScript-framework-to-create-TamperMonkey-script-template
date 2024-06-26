import { render } from 'preact';
import { PreactApp } from './App';

export function createPreactApp() {
    render(<PreactApp />, document.getElementById('preactApp')!);
}
