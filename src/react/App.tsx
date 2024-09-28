import React from 'react';
import Modal from './components/Modal';

import reactLogo from '../assets/svg/react.svg';

import { open, show } from './store/showStore';
import { useDispatch, useSelector } from 'react-redux';

import './app.css';

export default function App() {
    const dispatch = useDispatch();
    const _show = useSelector(show);
    return (
        <React.Fragment>
            <button id='framework-test-react-modal' className='framework-test-modal-switch' onClick={() => dispatch(open())}>
                <span>More</span>
                <img src={reactLogo} className='ft-button-logo' alt='React logo' />
            </button>
            {_show && <Modal msg='Welcome React'></Modal>}
        </React.Fragment>
    );
}
