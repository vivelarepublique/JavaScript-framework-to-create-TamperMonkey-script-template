import { Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function Bridge() {
    const [sharedState, setSharedState] = useState({
        //@ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    });

    useEffect(() => {
        unsafeWindow.addEventListener('kwChanged', () => {
            //@ts-ignore
            setSharedState({ search: unsafeWindow.scriptTemplate?.search || '' });
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
