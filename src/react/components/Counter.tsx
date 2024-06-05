import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, count } from '../store/counter';

import '../css/counter.css';

export default function Counter() {
    const dispatch = useDispatch();
    const currentCount = useSelector(count);
    return (
        <React.Fragment>
            <div>
                <h1>Counter</h1>
                <p>Count: {currentCount}</p>
                <div className='react-counter-row'>
                    <button className='react-counter-button' onClick={() => dispatch(increment())}>
                        Increment
                    </button>
                    <button className='react-counter-button' onClick={() => dispatch(decrement())}>
                        Decrement
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}
