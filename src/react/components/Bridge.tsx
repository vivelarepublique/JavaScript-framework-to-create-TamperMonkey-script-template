import React, { useState, useEffect } from 'react';

export default function Bridge() {
    const [sharedState, setSharedState] = useState({
        //@ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    });
    useEffect(() => {
        unsafeWindow.addEventListener('kwChangedForReact', () => {
            //@ts-ignore
            setSharedState({ search: unsafeWindow.scriptTemplate?.search || '' });
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
