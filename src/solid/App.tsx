import './css/app.css';

import Modal from './components/Modal';

import { show, setShow } from './signal/showSignal';

function App() {
    return (
        <div>
            <button id='solid-modal' onClick={() => setShow(true)}>
                Show Solid Modal
            </button>
            {show() && <Modal />}
        </div>
    );
}

export default App;
