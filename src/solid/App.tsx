import './app.css';

import Modal from './components/Modal';

import { show, open } from './signal/showSignal';

function App() {
    return (
        <div>
            <button id='framework-test-solid-modal' class='framework-test-modal-switch' onClick={open}>
                Show Solid Modal
            </button>
            {show() && <Modal msg='Welcome Solid' />}
        </div>
    );
}

export default App;
