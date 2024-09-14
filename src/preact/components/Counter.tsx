import { Fragment } from 'preact';

import { count } from '../signal/counterSignal';

import '../css/counter.css';

export default function Counter() {
    const _count = count.value;

    function _increment() {
        count.value++;
    }

    function _decrement() {
        count.value--;
    }

    return (
        <Fragment>
            <div>
                <h1>Counter</h1>
                <p>Count: {_count}</p>
                <div className='framework-test-counter-row'>
                    <button className='framework-test-counter-button framework-test-counter-button-preact' onClick={() => _increment()}>
                        Increment
                    </button>
                    <button className='framework-test-counter-button framework-test-counter-button-preact' onClick={() => _decrement()}>
                        Decrement
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
