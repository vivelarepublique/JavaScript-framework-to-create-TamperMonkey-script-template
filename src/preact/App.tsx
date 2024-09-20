import { Fragment } from 'preact';

import Modal from './components/Modal';

import { show, open } from './signal/showSignal';

import './app.css';

export function App() {
    const _show = show.value;

    return (
        <Fragment>
            <button id='framework-test-preact-modal' class='framework-test-modal-switch' onClick={open}>
                Show Preact Modal
            </button>
            {_show && <Modal msg='Welcome Preact'></Modal>}
        </Fragment>
    );
}
