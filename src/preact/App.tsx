import { Fragment } from 'preact';

import Modal from './components/Modal';

import { show } from './signal/showSignal';

import './app.css';

export function App() {
    const _show = show.value;

    function _open() {
        show.value = true;
    }

    return (
        <Fragment>
            <button id='framework-test-preact-modal' class='framework-test-modal-switch' onClick={() => _open()}>
                Show Preact Modal
            </button>
            {_show && <Modal msg='Welcome Preact'></Modal>}
        </Fragment>
    );
}
