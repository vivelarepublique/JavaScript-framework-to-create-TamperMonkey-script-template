import Test from './Test';
import Counter from './Counter';
import Bridge from './Bridge';

import { setShow } from '../signal/showSignal';

import '../css/modal.css';

export default function Modal() {
    function _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            setShow(false);
        }
    }

    return (
        <div class='solid-modal-mask' onClick={_close}>
            <div class='solid-modal-container'>
                <span>
                    <button class='solid-modal-close-button' onClick={() => setShow(false)}>
                        &times;
                    </button>
                </span>
                <div class='container text-center'>
                    <div class='row'>
                        <div class='col-5'>
                            <Test msg='Welcome Solid' />
                        </div>
                        <div class='col-3'>
                            <Counter />
                        </div>
                        <div class='col-2'>
                            <Bridge />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
