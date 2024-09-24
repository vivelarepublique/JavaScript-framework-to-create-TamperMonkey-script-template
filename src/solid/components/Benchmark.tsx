import { createSignal, Index } from 'solid-js';
import { divList, addRandomColorDiv, emptyRandomColorDiv } from '../signal/benchmarkSignal';

import { measureRenderTime } from '../../common/benchmark';

export default function Counter() {
    const [count, setCount] = createSignal(0);
    const [duration, setDuration] = createSignal(0);

    function _render() {
        measureRenderTime(addRandomColorDiv, count(), setDuration);
    }

    function handleNumberInput(event: Event) {
        const target = event.target as HTMLInputElement;
        setCount(parseInt(target.value));
    }
    return (
        <div>
            <h1>Counter</h1>
            <p>Spend Time: {duration()} ms</p>
            <div class='container text-center'>
                <div class='row align-items-center'>
                    <div class='input-group'>
                        <span class='input-group-text'>Render Number:</span>
                        <input type='number' class='form-control' placeholder='Input number of divList' value={count()} onInput={handleNumberInput} />
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={_render}>
                            Render
                        </button>
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={emptyRandomColorDiv}>
                            Empty
                        </button>
                    </div>
                </div>
            </div>
            <div class='container text-center'>
                <div class='row align-items-center'>
                    <Index each={divList()}>
                        {(ds, index) => (
                            <div class='col-1' style={{ 'background-color': ds().backgroundColor, color: ds().color, 'font-size': '8px' }}>
                                Div# {ds().id}
                            </div>
                        )}
                    </Index>
                </div>
            </div>
        </div>
    );
}
