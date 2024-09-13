import { Fragment } from 'preact';
import { useContext, useCallback } from 'preact/hooks';

import VectorImage from './VectorImage';
import Counter from './Counter';
import WindowEvent from './WindowEvent';

import ShowContext from '../context/ShowContext';

export default function Modal() {
    const { close } = useContext(ShowContext);

    const _close = useCallback(
        (event: Event) => {
            event.stopPropagation();
            if (event.target === event.currentTarget) {
                close();
            }
        },
        [close],
    );

    return (
        <Fragment>
            <div class='framework-test-modal-mask' onClick={_close}>
                <div class='framework-test-modal-container'>
                    <span>
                        <button class='framework-test-modal-close-button' onClick={() => close()}>
                            &times;
                        </button>
                    </span>
                    <div class='container text-center'>
                        <div class='row'>
                            <div class='col-5'>
                                <VectorImage msg='Welcome Preact' />
                            </div>
                            <div class='col-3'>
                                <Counter />
                            </div>
                            <div class='col-2'>
                                <WindowEvent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
