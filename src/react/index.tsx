import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './index.css';

export function createReact(target: HTMLElement) {
    createRoot(target).render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}
