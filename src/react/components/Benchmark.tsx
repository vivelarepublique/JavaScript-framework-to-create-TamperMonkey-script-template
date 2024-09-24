import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { divs, addRandomColorDiv, emptyRandomColorDiv } from '../store/benchmarkStore';

export default function Counter() {
    const dispatch = useDispatch();
    const _divs = useSelector(divs);
    const [count, setCount] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    function _render() {
        setStartTime(Date.now());
        dispatch(addRandomColorDiv(count));
        setEndTime(Date.now());
    }
    return (
        <React.Fragment>
            <div>
                <h1>Benchmark</h1>
                <p>Spend Time: {endTime - startTime} ms</p>
                <div className='container text-center'>
                    <div className='row align-items-center'>
                        <div className='input-group'>
                            <span className='input-group-text'>Render Number:</span>
                            <input type='number' className='form-control' placeholder='Input number of divs' value={count} onChange={e => setCount(parseInt(e.target.value))} />
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => _render()}>
                                Render
                            </button>
                            <button type='button' className='btn btn-lg btn-framework-test-react' onClick={() => dispatch(emptyRandomColorDiv())}>
                                Empty
                            </button>
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <div className='row align-items-center'>
                        {_divs.map(ds => {
                            return (
                                <div key={ds.id} className='col-1' style={{ backgroundColor: ds.backgroundColor, color: ds.color, fontSize: '8px' }}>
                                    Div# {ds.id}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
