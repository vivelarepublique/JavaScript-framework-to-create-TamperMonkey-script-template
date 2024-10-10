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
        <div class='block'>
            <div class='subtitle is-2 header-framework-test-solid'>Window Event, Value is {sharedState().search}</div>
        </div>
    );
}
