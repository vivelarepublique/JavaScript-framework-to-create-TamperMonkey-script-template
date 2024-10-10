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
        <div class='block'>
            <div class='subtitle is-2 header-framework-test-preact'>Window Event, Value is {sharedState.search}</div>
        </div>
    );
}
