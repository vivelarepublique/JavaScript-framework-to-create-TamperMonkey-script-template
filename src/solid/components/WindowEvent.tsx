import { createSignal, onMount } from 'solid-js';

import { windowProxy } from '../../common/utils/tamperMonkeyFunction';

export default function WindowEvent() {
    const [sharedState, setSharedState] = createSignal({
        search: windowProxy.scriptTemplate?.search || '',
    });

    onMount(() => {
        windowProxy.addEventListener('kwChanged', () => {
            setSharedState({ search: windowProxy.scriptTemplate?.search || '' });
        });
    });

    return (
        <>
            <div>
                <h1>Window Event Test</h1>
                <p>Value: {sharedState().search}</p>
            </div>
        </>
    );
}
