import './app.css';
import { Show } from 'solid-js';

import Modal from './components/Modal';

import { show, open } from './signal/showSignal';

function App() {
    return (
        <div>
            <button id='framework-test-solid-modal' class='framework-test-modal-switch' onClick={open}>
                Show Solid Modal
            </button>
            <Show when={show()}>
                <Modal msg='Welcome Solid' />
            </Show>
        </div>
    );
}

export default App;
