import { createSignal, onMount } from 'solid-js';

export default function Bridge() {
    const [sharedState, setSharedState] = createSignal({
        //@ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    });

    onMount(() => {
        unsafeWindow.addEventListener('kwChanged', () => {
            //@ts-ignore
            setSharedState({ search: unsafeWindow.scriptTemplate?.search || '' });
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
