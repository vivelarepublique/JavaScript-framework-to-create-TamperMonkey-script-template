import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, count } from '../store/counterStore';

export default function Counter() {
    const dispatch = useDispatch();
    const _count = useSelector(count);
    return (
        <React.Fragment>
            <div>
                <h1>Counter</h1>
                <p>Count: {_count}</p>
                <div className='container text-center'>
                    <div className='row align-items-center'>
                        <div className='col-4'></div>
                        <div className='col-2'>
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(increment())}>
                                Increment
                            </button>
                        </div>
                        <div className='col-2'>
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(decrement())}>
                                Decrement
                            </button>
                        </div>
                        <div className='col-4'></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
