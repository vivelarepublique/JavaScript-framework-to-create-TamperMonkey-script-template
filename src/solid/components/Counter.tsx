import { count, increment, decrement } from '../signal/counterSignal';

export default function Counter() {
    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count()}</p>
            <div class='container text-center'>
                <div class='row align-items-center'>
                    <div class='col-4'></div>
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
                    <div class='col-4'></div>
                </div>
            </div>
        </div>
    );
}
