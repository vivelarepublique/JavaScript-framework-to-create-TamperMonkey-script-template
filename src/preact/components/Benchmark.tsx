import { Fragment } from 'preact';
import { useState } from 'preact/hooks';

import { measureRenderTime } from '../../common/benchmark';

import { divList, addRandomColorDiv, emptyRandomColorDiv } from '../signal/benchmarkSignal';

export default function Counter() {
    const _divList = divList.value;
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    function _render() {
        measureRenderTime(addRandomColorDiv, count, setDuration);
    }

    function handleNumberInput(event: Event) {
        const target = event.target as HTMLInputElement;
        setCount(parseInt(target.value));
    }

    return (
        <Fragment>
            <div>
                <h1>Benchmark</h1>
                <p>Spend Time: {duration} ms</p>
                <div class='container text-center'>
                    <div class='row align-items-center'>
                        <div class='input-group'>
                            <span class='input-group-text'>Render Number:</span>
                            <input type='number' class='form-control' placeholder='Input number of divList' value={count} onInput={handleNumberInput} />
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={() => _render()}>
                                Render
                            </button>
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={() => emptyRandomColorDiv()}>
                                Empty
                            </button>
                        </div>
                    </div>
                </div>
                <div class='container text-center'>
                    <div class='row align-items-center'>
                        {_divList.map(ds => {
                            return (
                                <div key={ds.id} class='col-1' style={{ backgroundColor: ds.backgroundColor, color: ds.color, fontSize: '8px' }}>
                                    Div# {ds.id}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
