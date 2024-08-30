import React from 'react';

import Test from './Test';
import Counter from './Counter';
import Bridge from './Bridge';

import '../css/modal.css';

import { close } from '../store/switcher';
import { useDispatch } from 'react-redux';

export default function Modal() {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <div
                className='react-modal-mask'
                onClick={event => {
                    event.stopPropagation();
                    if (event.target === event.currentTarget) {
                        dispatch(close());
                    }
                }}
            >
                <div className='react-modal-container'>
                    <span>
                        <button className='react-modal-close-button' onClick={() => dispatch(close())}>
                            &times;
                        </button>
                    </span>
                    <div className='container text-center'>
                        <div className='row'>
                            <div className='col-5'>
                                <Test msg='Welcome React' />
                            </div>
                            <div className='col-3'>
                                <Counter />
                            </div>
                            <div className='col-2'>
                                <Bridge />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
