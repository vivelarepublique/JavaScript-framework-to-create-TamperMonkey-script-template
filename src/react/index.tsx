import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

export function createReactApp() {
    const root = createRoot(document.querySelector('#reactApp')!);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}
