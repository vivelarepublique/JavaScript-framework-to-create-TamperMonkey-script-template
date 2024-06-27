import { createSignal } from 'solid-js';
import { Accessor, Setter } from 'solid-js';

import '../css/modal.css';

interface Props {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
}

export default function Modal(props: Props) {
    const { setShow } = props;

    return (
        <div
            class='modal-mask'
            onClick={event => {
                event.stopPropagation();
                if (event.target === event.currentTarget) {
                    setShow(false);
                }
            }}
        >
            <div class='modal-container'>
                <span>
                    <button class='modal-close-button' onClick={() => setShow(false)}>
                        &times;
                    </button>
                </span>
                <div class='b4-container'>
                    <div class='b4-row'></div>
                </div>
            </div>
        </div>
    );
}
