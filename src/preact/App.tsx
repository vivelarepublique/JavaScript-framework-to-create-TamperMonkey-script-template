import { Fragment } from 'preact';

import preactLogo from '../assets/svg/preact.svg';

import Modal from './components/Modal';

import { show, open } from './signal/showSignal';

import './app.css';

export function App() {
    const _show = show.value;

    return (
        <Fragment>
            <button id='framework-test-preact-modal' class='framework-test-modal-switch' onClick={open}>
                <span>More</span>
                <img src={preactLogo} class='ft-button-logo' alt='Preact logo' />
            </button>
            {_show && <Modal msg='Welcome Preact'></Modal>}
        </Fragment>
    );
}
