import { createSignal, onMount } from 'solid-js';

import { windowProxy } from '../../native/utils/tamperMonkeyFunction';

export default function Bridge() {
    const [sharedState, setSharedState] = createSignal({
        //@ts-ignore
        search: windowProxy.scriptTemplate?.search || '',
    });

    onMount(() => {
        windowProxy.addEventListener('kwChanged', () => {
            //@ts-ignore
            setSharedState({ search: windowProxy.scriptTemplate?.search || '' });
        });
    });

    return (
        <>
            <div>
                <h1>Bridge</h1>
                <p>Value: {sharedState().search}</p>
            </div>
        </>
    );
}
