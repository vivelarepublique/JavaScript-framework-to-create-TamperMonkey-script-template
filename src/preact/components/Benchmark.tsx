import { useState } from 'preact/hooks';

import { measureRenderTime } from '../../common/components/benchmark';

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
        <div class='block'>
            <div class='subtitle is-2 header-framework-test-preact'>Benchmark, Spend Time: {duration} ms</div>

            <div class='field'>
                <label class='label'>Render Number</label>
                <div class='control'>
                    <input type='number' class='input' placeholder='Render Number' value={count} onInput={handleNumberInput} />
                </div>
            </div>

            <div class='field is-grouped'>
                <div class='control'>
                    <button class='button is-large button-framework-test-preact' onClick={() => _render()}>
                        Render
                    </button>
                </div>
                <div class='control'>
                    <button class='button is-large button-framework-test-preact' onClick={() => emptyRandomColorDiv()}>
                        Empty
                    </button>
                </div>
            </div>

            <div class='columns is-multiline'>
                {_divList.map(ds => {
                    return (
                        <div key={ds.id} class='column is-1' style={{ backgroundColor: ds.backgroundColor, color: ds.color, fontSize: '8px' }}>
                            Div# {ds.id}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
