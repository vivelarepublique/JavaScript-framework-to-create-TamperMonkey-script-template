import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../store/counterStore';

export default function Counter() {
    const dispatch = useDispatch();
    const _count = useSelector(count);
    const [amount, setAmount] = useState(0);
    return (
        <React.Fragment>
            <div>
                <h1>Counter</h1>
                <div className='alert alert-dark' role='alert'>
                    Count: {_count}
                </div>
                <div className='container text-center'>
                    <div className='row align-items-end'>
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
                        <div className='col-4'>
                            <div className='input-group'>
                                <input type='number' className='form-control' placeholder='Amount' value={amount} onChange={e => setAmount(Number(e.target.value))} />
                                <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(incrementByAmount(amount))}>
                                    Increment By Amount
                                </button>
                            </div>
                        </div>
                        <div className='col-3'>
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(doubleCount())}>
                                Double Count
                            </button>
                        </div>
                        <div className='col-1'>
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(reset())}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
