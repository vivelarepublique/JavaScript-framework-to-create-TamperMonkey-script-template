<script lang="ts">
    import { onMount } from 'svelte';

    import { windowProxy } from '../../native/utils/tamperMonkeyFunction';
    const sharedState = {
        //@ts-ignore
        search: windowProxy.scriptTemplate?.search || '',
    };
    onMount(() => {
        windowProxy.addEventListener('kwChanged', () => {
            //@ts-ignore
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>

<div>
    <h1>Bridge</h1>
    <p>Value: {sharedState.search}</p>
</div>
