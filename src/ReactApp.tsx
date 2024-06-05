import React from 'react';
import Modal from './react/components/Modal';

import { open, show } from './react/store/switcher';
import { useDispatch, useSelector } from 'react-redux';

import './react/css/modal.css';

export default function App() {
    const dispatch = useDispatch();
    const isShow = useSelector(show);
    return (
        <React.Fragment>
            <button id='react-modal' onClick={() => dispatch(open())}>
                Show React Modal
            </button>
            {isShow && <Modal></Modal>}
        </React.Fragment>
    );
}
