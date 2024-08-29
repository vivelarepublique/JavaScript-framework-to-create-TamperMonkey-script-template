<script lang="ts">
    import { onMount } from 'svelte';
    const sharedState = {
        //@ts-ignore
        search: unsafeWindow.scriptTemplate?.search || '',
    };
    onMount(() => {
        unsafeWindow.addEventListener('kwChanged', () => {
            //@ts-ignore
            sharedState.search = unsafeWindow.scriptTemplate?.search || '';
        });
    });
</script>

<div>
    <h1>Bridge</h1>
    <p>Value: {sharedState.search}</p>
</div>
