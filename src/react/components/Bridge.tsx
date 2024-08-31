import React, { useState, useEffect } from 'react';

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
        <React.Fragment>
            <div>
                <h1>Bridge</h1>
                <p>Value: {sharedState.search}</p>
            </div>
        </React.Fragment>
    );
}
