import { Fragment } from 'preact';
import { useContext } from 'preact/hooks';

import ShowContext from '../context/ShowContext';
export default function Modal() {
    const { setShow } = useContext(ShowContext);

    return (
        <Fragment>
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
        </Fragment>
    );
}
