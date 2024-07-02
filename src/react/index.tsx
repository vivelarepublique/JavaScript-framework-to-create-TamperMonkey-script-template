import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

import './index.css';

export function createReactApp() {
    createRoot(document.querySelector('#reactApp')!).render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}
