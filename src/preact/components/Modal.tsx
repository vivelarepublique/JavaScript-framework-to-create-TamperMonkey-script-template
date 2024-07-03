import { Fragment } from 'preact';
import { useContext, useState } from 'preact/hooks';

import Test from './Test';
import Counter from './Counter';

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
                    <div class='preact-b4-container'>
                        <div class='preact-b4-row'>
                            <Test msg='Welcome Preact' />
                            <CounterContext.Provider value={{ count, increment: setCount, decrement: setCount }}>
                                <Counter />
                            </CounterContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
