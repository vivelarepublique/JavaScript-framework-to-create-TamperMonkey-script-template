import VectorImage from './VectorImage';
import Counter from './Counter';
import Bridge from './Bridge';

import { setShow } from '../signal/showSignal';

export default function Modal() {
    function _close(event: Event) {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            setShow(false);
        }
    }

    return (
        <div class='framework-test-modal-mask' onClick={_close}>
            <div class='framework-test-modal-container'>
                <span>
                    <button class='framework-test-modal-close-button' onClick={() => setShow(false)}>
                        &times;
                    </button>
                </span>
                <div class='container text-center'>
                    <div class='row'>
                        <div class='col-5'>
                            <VectorImage msg='Welcome Solid' />
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
