import App from './App.svelte';

import './index.css';

export function createSvelte(target: HTMLElement) {
    return new App({
        target,
    });
}
