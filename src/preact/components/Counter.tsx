import { useState } from 'preact/hooks';

import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../signal/counterSignal';

export default function Counter() {
    const _count = count.value;
    const [amount, setAmount] = useState(0);

    function handleAmountChange(event: Event) {
        const target = event.target as HTMLInputElement;
        setAmount(parseInt(target.value));
    }

    return (
        <div class='block'>
            <div class='subtitle is-2 header-framework-test-preact'>Counter, Count is {_count}</div>

            <div class='columns'>
                <div class='column'>
                    <button class='button button-framework-test-preact' onClick={increment}>
                        Increment
                    </button>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-preact' onClick={decrement}>
                        Decrement
                    </button>
                </div>
                <div class='column'>
                    <div class='field has-addons'>
                        <div class='control'>
                            <input type='number' class='input' placeholder='Amount' value={amount} onChange={handleAmountChange} />
                        </div>
                        <div class='control'>
                            <button class='button button-framework-test-preact' onClick={() => incrementByAmount(amount)}>
                                Increment By Amount
                            </button>
                        </div>
                    </div>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-preact' onClick={doubleCount}>
                        Double Count
                    </button>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-preact' onClick={reset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
