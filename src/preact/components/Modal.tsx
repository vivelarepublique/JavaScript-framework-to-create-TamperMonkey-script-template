import { Fragment } from 'preact';
import { useContext, useState } from 'preact/hooks';

import Test from './Test';
import Counter from './Counter';
import Bridge from './Bridge';

import '../css/modal.css';

import ShowContext from '../context/ShowContext';
import CounterContext from '../context/CounterContext';

export default function Modal() {
    const { setShow } = useContext(ShowContext);

    const [count, setCount] = useState<number>(0);

    return (
        <Fragment>
            <div
                class='preact-modal-mask'
                onClick={event => {
                    event.stopPropagation();
                    if (event.target === event.currentTarget) {
                        setShow(false);
                    }
                }}
            >
                <div class='preact-modal-container'>
                    <span>
                        <button class='preact-modal-close-button' onClick={() => setShow(false)}>
                            &times;
                        </button>
                    </span>
                    <div class='container text-center'>
                        <div class='row'>
                            <div class='col-5'>
                                <Test msg='Welcome Preact' />
                            </div>
                            <div class='col-3'>
                                <CounterContext.Provider value={{ count, increment: setCount, decrement: setCount }}>
                                    <Counter />
                                </CounterContext.Provider>
                            </div>
                            <div class='col-2'>
                                <Bridge></Bridge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
