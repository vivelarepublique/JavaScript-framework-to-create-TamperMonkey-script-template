import { Fragment } from 'preact';

import { count, increment, decrement } from '../signal/counterSignal';

export default function Counter() {
    const _count = count.value;

    return (
        <Fragment>
            <div>
                <h1>Counter</h1>
                <p>Count: {_count}</p>
                <div class='container text-center'>
                    <div class='row align-items-center'>
                        <div class='col-4'></div>
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
                        <div class='col-4'></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
