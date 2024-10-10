import { createSignal } from 'solid-js';
import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../signal/counterSignal';

export default function Counter() {
    const [amount, setAmount] = createSignal(0);

    function handleNAmountInput(event: Event) {
        const target = event.target as HTMLInputElement;
        setAmount(parseInt(target.value));
    }
    return (
        <div class='block'>
            <div class='subtitle is-2 header-framework-test-solid'>Counter, Count is {count()}</div>

            <div class='columns'>
                <div class='column'>
                    <button class='button button-framework-test-solid' onClick={increment}>
                        Increment
                    </button>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-solid' onClick={decrement}>
                        Decrement
                    </button>
                </div>
                <div class='column'>
                    <div class='field has-addons'>
                        <div class='control'>
                            <input type='number' class='input' placeholder='Amount' value={amount()} onInput={handleNAmountInput} />
                        </div>
                        <div class='control'>
                            <button class='button button-framework-test-solid' onClick={() => incrementByAmount(amount())}>
                                Increment By Amount
                            </button>
                        </div>
                    </div>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-solid' onClick={doubleCount}>
                        Double Count
                    </button>
                </div>
                <div class='column'>
                    <button class='button button-framework-test-solid' onClick={reset}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
