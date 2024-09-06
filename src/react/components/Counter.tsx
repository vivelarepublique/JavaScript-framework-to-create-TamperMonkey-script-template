import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, count } from '../store/counterStore';

import '../css/counter.css';

export default function Counter() {
    const dispatch = useDispatch();
    const _count = useSelector(count);
    return (
        <React.Fragment>
            <div>
                <h1>Counter</h1>
                <p>Count: {_count}</p>
                <div className='framework-test-counter-row'>
                    <button className='framework-test-counter-button framework-test-counter-button-react' onClick={() => dispatch(increment())}>
                        Increment
                    </button>
                    <button className='framework-test-counter-button framework-test-counter-button-react' onClick={() => dispatch(decrement())}>
                        Decrement
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}
