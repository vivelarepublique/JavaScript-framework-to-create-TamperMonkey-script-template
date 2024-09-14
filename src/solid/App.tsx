import './app.css';

import Modal from './components/Modal';

import { show, setShow } from './signal/showSignal';

function App() {
    return (
        <div>
            <button id='framework-test-solid-modal' class='framework-test-modal-switch' onClick={() => setShow(true)}>
                Show Solid Modal
            </button>
            {show() && <Modal msg='Welcome Solid' />}
        </div>
    );
}

export default App;
