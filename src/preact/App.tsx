import { Fragment } from 'preact';
import { useState } from 'preact/hooks';

import './app.css';

import Modal from './components/Modal';

import ShowContext from './context/ShowContext';
import CounterContext from './context/CounterContext';

export function App() {
    const [show, setShow] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    return (
        <Fragment>
            <CounterContext.Provider value={{ count, increment: () => setCount(count + 1), decrement: () => setCount(count - 1) }}>
                <ShowContext.Provider value={{ show, open: () => setShow(true), close: () => setShow(false) }}>
                    <button id='framework-test-preact-modal' class='framework-test-modal-switch' onClick={() => setShow(true)}>
                        Show Preact Modal
                    </button>
                    {show && <Modal></Modal>}
                </ShowContext.Provider>
            </CounterContext.Provider>
        </Fragment>
    );
}
