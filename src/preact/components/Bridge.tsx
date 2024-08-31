import { Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

export default function Bridge() {
    const [sharedState, setSharedState] = useState({
        //@ts-ignore
        search: windowProxy.scriptTemplate?.search || '',
    });

    useEffect(() => {
        windowProxy.addEventListener('kwChanged', () => {
            //@ts-ignore
            setSharedState({ search: windowProxy.scriptTemplate?.search || '' });
        });
    }, []);

    return (
        <Fragment>
            <div>
                <h1>Bridge</h1>
                <p>Value: {sharedState.search}</p>
            </div>
        </Fragment>
    );
}
