import { Fragment } from 'preact';
import { useState } from 'preact/hooks';

import './css/modal.css';

export function PreactApp() {
    const [isShow, setIsShow] = useState(false);

    return (
        <Fragment>
            <button id='preact-modal' onClick={() => setIsShow(true)}>
                Show Preact Modal
            </button>
        </Fragment>
    );
}
