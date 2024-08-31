import React from 'react';
import Modal from './components/Modal';

import { open, show } from './store/showStore';
import { useDispatch, useSelector } from 'react-redux';

import './css/app.css';

export default function App() {
    const dispatch = useDispatch();
    const _show = useSelector(show);
    return (
        <React.Fragment>
            <button id='react-modal' onClick={() => dispatch(open())}>
                Show React Modal
            </button>
            {_show && <Modal></Modal>}
        </React.Fragment>
    );
}
