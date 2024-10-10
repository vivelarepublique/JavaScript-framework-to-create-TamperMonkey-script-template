<script lang="ts">
    import { onMount } from 'svelte';

    import { windowProxy } from '../../common/utils/tamperMonkeyFunction';
    const sharedState = {
        search: windowProxy.scriptTemplate?.search || '',
    };
    onMount(() => {
        windowProxy.addEventListener('kwChanged', () => {
            sharedState.search = windowProxy.scriptTemplate?.search || '';
        });
    });
</script>

<div class="block">
    <div class="subtitle is-2 header-framework-test-svelte">Window Event, Value is {sharedState.search}</div>
</div>
