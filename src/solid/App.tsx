import { createSignal } from 'solid-js';
import './css/app.css';

import Modal from './components/Modal';

function App() {
    const [show, setShow] = createSignal<boolean>(false);

    return (
        <div>
            <button id='solid-modal' onClick={() => setShow(_ => true)}>
                Show Solid Modal
            </button>
            {show() && <Modal show={show} setShow={setShow} />}
        </div>
    );
}

export default App;
