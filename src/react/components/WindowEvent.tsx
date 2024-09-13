import React, { useState, useEffect } from 'react';

import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

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
        <React.Fragment>
            <div>
                <h1>Window Event Test</h1>
                <p>Value: {sharedState.search}</p>
            </div>
        </React.Fragment>
    );
}
