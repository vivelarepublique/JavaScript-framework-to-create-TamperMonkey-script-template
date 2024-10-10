import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../store/counterStore';

export default function Counter() {
    const dispatch = useDispatch();
    const _count = useSelector(count);
    const [amount, setAmount] = useState(0);
    return (
        <React.Fragment>
            <div className='block'>
                <div className='subtitle is-2 header-framework-test-react'>Counter, Count is {_count}</div>

                <div className='columns'>
                    <div className='column'>
                        <button className='button button-framework-test-react' onClick={() => dispatch(increment())}>
                            Increment
                        </button>
                    </div>
                    <div className='column'>
                        <button className='button button-framework-test-react' onClick={() => dispatch(decrement())}>
                            Decrement
                        </button>
                    </div>
                    <div className='column'>
                        <div className='field has-addons'>
                            <div className='control'>
                                <input type='number' className='input' placeholder='Amount' value={amount} onChange={e => setAmount(Number(e.target.value))} />
                            </div>
                            <div className='control'>
                                <button className='button button-framework-test-react' onClick={() => dispatch(incrementByAmount(amount))}>
                                    Increment By Amount
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='column'>
                        <button className='button button-framework-test-react' onClick={() => dispatch(doubleCount())}>
                            Double Count
                        </button>
                    </div>
                    <div className='column'>
                        <button className='button button-framework-test-react' onClick={() => dispatch(reset())}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
