import React, { useState } from 'react';

import { measureRenderTime } from '../../common/benchmark';

import { useDispatch, useSelector } from 'react-redux';
import { divList, addRandomColorDiv, emptyRandomColorDiv } from '../store/benchmarkStore';

export default function Counter() {
    const dispatch = useDispatch();
    const _divList = useSelector(divList);
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    function _add(count: number) {
        dispatch(addRandomColorDiv(count));
    }

    function _render() {
        measureRenderTime(_add, count, setDuration);
    }

    function handleNumberInput(event: React.ChangeEvent<HTMLInputElement>) {
        setCount(parseInt(event.target.value));
    }
    return (
        <React.Fragment>
            <div>
                <h1>Benchmark</h1>
                <p>Spend Time: {duration} ms</p>
                <div className='container text-center'>
                    <div className='row align-items-center'>
                        <div className='input-group'>
                            <span className='input-group-text'>Render Number:</span>
                            <input type='number' className='form-control' placeholder='Input number of divs' value={count} onChange={handleNumberInput} />
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
                        {_divList.map(ds => {
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
