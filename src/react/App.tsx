import React from 'react';
import Modal from './components/Modal';

import { open, show } from './store/showStore';
import { useDispatch, useSelector } from 'react-redux';

import './app.css';

export default function App() {
    const dispatch = useDispatch();
    const _show = useSelector(show);
    return (
        <React.Fragment>
            <button id='framework-test-react-modal' className='framework-test-modal-switch' onClick={() => dispatch(open())}>
                Show React Modal
            </button>
            {_show && <Modal></Modal>}
        </React.Fragment>
    );
}
