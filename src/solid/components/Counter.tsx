import { createSignal } from 'solid-js';
import { count, increment, decrement, incrementByAmount, doubleCount, reset } from '../signal/counterSignal';

export default function Counter() {
    const [amount, setAmount] = createSignal(0);

    function handleNAmountInput(event: Event) {
        const target = event.target as HTMLInputElement;
        setAmount(parseInt(target.value));
    }
    return (
        <div>
            <h1>Counter</h1>
            <div class='alert alert-dark' role='alert'>
                Count: {count()}
            </div>
            <div class='container text-center'>
                <div class='row align-items-end'>
                    <div class='col-2'>
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={increment}>
                            Increment
                        </button>
                    </div>
                    <div class='col-2'>
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={decrement}>
                            Decrement
                        </button>
                    </div>
                    <div class='col-4'>
                        <div class='input-group'>
                            <input type='number' class='form-control' placeholder='Amount' value={amount()} onInput={handleNAmountInput} />
                            <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={() => incrementByAmount(amount())}>
                                Increment By Amount
                            </button>
                        </div>
                    </div>
                    <div class='col-3'>
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={doubleCount}>
                            Double Count
                        </button>
                    </div>
                    <div class='col-1'>
                        <button type='button' class='btn btn-lg btn-framework-test-solid' onClick={reset}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
