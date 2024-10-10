import React, { useState, useEffect } from 'react';

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
        <React.Fragment>
            <div className='block'>
                <div className='subtitle is-2 header-framework-test-react'>Window Event, Value is {sharedState.search}</div>
            </div>
        </React.Fragment>
    );
}
