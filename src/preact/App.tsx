import { Fragment } from 'preact';
import { useState } from 'preact/hooks';

import './css/app.css';

import Modal from './components/Modal';

import ShowContext from './context/ShowContext';

export function App() {
    const [show, setShow] = useState<boolean>(false);

    return (
        <Fragment>
            <ShowContext.Provider value={{ show, setShow }}>
                <button id='preact-modal' onClick={() => setShow(true)}>
                    Show Preact Modal
                </button>
                {show && <Modal></Modal>}
            </ShowContext.Provider>
        </Fragment>
    );
}
