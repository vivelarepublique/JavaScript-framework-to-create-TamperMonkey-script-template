import { count, setCount } from '../signal/counterSignal';

import '../css/counter.css';

export default function Counter() {
    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count()}</p>
            <div class='solid-counter-row'>
                <button class='solid-counter-button' onClick={() => setCount(count() + 1)}>
                    Increment
                </button>
                <button class='solid-counter-button' onClick={() => setCount(count() - 1)}>
                    Decrement
                </button>
            </div>
        </div>
    );
}
