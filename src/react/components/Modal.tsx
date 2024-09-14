import React, { Fragment, useState, useCallback } from 'react';
import type { ComponentType } from 'react';

import VectorImage from './VectorImage';
import Counter from './Counter';
import WindowEvent from './WindowEvent';

import { close } from '../store/showStore';
import { useDispatch } from 'react-redux';

import '../css/modal.css';

const componentsMap: Record<string, ComponentType> = {
    VectorImage,
    Counter,
    WindowEvent,
};

interface Props {
    msg: string;
}

export default function Modal(props: Props) {
    const [currentView, setCurrentView] = useState('VectorImage');
    const ComponentToRender = componentsMap[currentView];
    const { msg } = props;
    const dispatch = useDispatch();

    const _close = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            if (event.target === event.currentTarget) {
                dispatch(close());
            }
        },
        [dispatch],
    );
    return (
        <Fragment>
            <div className='framework-test-modal-mask' onClick={_close}>
                <div className='framework-test-modal-container'>
                    <span>
                        <button className='framework-test-modal-close-button' onClick={() => dispatch(close())}>
                            &times;
                        </button>
                    </span>
                    <div className='container-fluid text-center'>
                        <div className='row'>
                            <div className='col-2'>
                                <p className='framework-test-header-react framework-test-heavy'>{msg}</p>
                                <div className='btn-group-vertical' role='group'>
                                    <button type='button' className={currentView === 'VectorImage' ? 'btn btn-framework-test btn-framework-test-react' : 'btn btn-framework-test'} onClick={() => setCurrentView('VectorImage')}>
                                        Vector Image
                                    </button>
                                    <button type='button' className={currentView === 'Counter' ? 'btn btn-framework-test btn-framework-test-react' : 'btn btn-framework-test'} onClick={() => setCurrentView('Counter')}>
                                        Counter
                                    </button>
                                    <button type='button' className={currentView === 'WindowEvent' ? 'btn btn-framework-test btn-framework-test-react' : 'btn btn-framework-test'} onClick={() => setCurrentView('WindowEvent')}>
                                        Window Event
                                    </button>
                                </div>
                            </div>

                            <div className='col-8'>
                                <ComponentToRender />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
