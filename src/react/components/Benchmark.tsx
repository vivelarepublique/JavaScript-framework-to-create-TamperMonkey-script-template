import React, { useState } from 'react';

import { measureRenderTime } from '../../common/components/benchmark';

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
            <div className='block'>
                <div className='subtitle is-2 header-framework-test-react'>Benchmark, Spend Time: {duration} ms</div>

                <div className='field'>
                    <label className='label'>Render Number</label>
                    <div className='control'>
                        <input type='number' className='input' placeholder='Render Number' value={count} onChange={handleNumberInput} />
                    </div>
                </div>

                <div className='field is-grouped'>
                    <div className='control'>
                        <button className='button is-large button-framework-test-react' onClick={() => _render()}>
                            Render
                        </button>
                    </div>
                    <div className='control'>
                        <button className='button is-large button-framework-test-react' onClick={() => dispatch(emptyRandomColorDiv())}>
                            Empty
                        </button>
                    </div>
                </div>

                <div className='columns is-multiline'>
                    {_divList.map(ds => {
                        return (
                            <div key={ds.id} className='column is-1' style={{ backgroundColor: ds.backgroundColor, color: ds.color, fontSize: '8px' }}>
                                Div# {ds.id}
                            </div>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
