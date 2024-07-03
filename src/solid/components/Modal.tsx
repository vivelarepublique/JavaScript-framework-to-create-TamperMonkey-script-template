import Test from './Test';
import Counter from './Counter';
import { setShow } from '../signal/showSignal';

import '../css/modal.css';

export default function Modal() {
    return (
        <div
            class='solid-modal-mask'
            onClick={event => {
                event.stopPropagation();
                if (event.target === event.currentTarget) {
                    setShow(false);
                }
            }}
        >
            <div class='solid-modal-container'>
                <span>
                    <button class='solid-modal-close-button' onClick={() => setShow(false)}>
                        &times;
                    </button>
                </span>
                <div class='solid-b4-container'>
                    <div class='solid-b4-row'>
                        <Test msg='Welcome Solid' />
                        <Counter />
                    </div>
                </div>
            </div>
        </div>
    );
}
