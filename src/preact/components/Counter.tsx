import { Fragment } from 'preact';
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
        <Fragment>
            <div>
                <h1>Counter</h1>
                <div class='alert alert-dark' role='alert'>
                    Count: {_count}
                </div>
                <div class='container text-center'>
                    <div class='row align-items-end'>
                        <div class='col-2'>
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={increment}>
                                Increment
                            </button>
                        </div>
                        <div class='col-2'>
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={decrement}>
                                Decrement
                            </button>
                        </div>
                        <div class='col-4'>
                            <div class='input-group'>
                                <input type='number' class='form-control' placeholder='Amount' value={amount} onChange={handleAmountChange} />
                                <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={() => incrementByAmount(amount)}>
                                    Increment By Amount
                                </button>
                            </div>
                        </div>
                        <div class='col-3'>
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={doubleCount}>
                                Double Count
                            </button>
                        </div>
                        <div class='col-1'>
                            <button type='button' class='btn btn-lg btn-framework-test-preact' onClick={reset}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
