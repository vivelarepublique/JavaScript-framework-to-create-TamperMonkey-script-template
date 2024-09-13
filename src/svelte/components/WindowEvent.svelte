<script lang="ts">
    import { onMount } from 'svelte';

    import { windowProxy } from '../../native/utils/tamperMonkeyFunction';
    const sharedState = {
        search: windowProxy.scriptTemplate?.search || '',
    };
    onMount(() => {
        windowProxy.addEventListener('kwChanged', () => {
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>

<div>
    <h1>Window Event Test</h1>
    <p>Value: {sharedState.search}</p>
</div>
