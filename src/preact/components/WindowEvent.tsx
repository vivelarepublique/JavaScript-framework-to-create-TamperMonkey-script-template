import { Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { windowProxy } from '../../common/utils/tamperMonkeyFunction';

export default function WindowEvent() {
    const [sharedState, setSharedState] = useState({
        search: windowProxy.scriptTemplate?.search || '',
    });

    useEffect(() => {
        windowProxy.addEventListener('kwChanged', () => {
            setSharedState({ search: windowProxy.scriptTemplate?.search || '' });
        });
    }, []);

    return (
        <Fragment>
            <div>
                <h1>Window Event Test</h1>
                <p>Value: {sharedState.search}</p>
            </div>
        </Fragment>
    );
}
