<script>
  import BreadCrumbs from 'src/MainUi/Settings/components/BreadCrumbs.svelte';
  import { onDestroy, onMount } from 'svelte';
  import CrawlerListItem from './components/CrawlerListItem.svelte';
  import NoCrawlers from './components/NoCrawlers.svelte';

  let availableCrawlers = [];

  $: console.log(availableCrawlers);

  let availableCrawlersListener = (data) => {
    availableCrawlers = data.availableCrawlers;
  };
  // @ts-ignore
  const removeEventListener = window.ipc.receive('receiveIpcEvent', availableCrawlersListener);

  onMount(() => {
    // @ts-ignore
    window.ipc.send('sendIpcEvent', { eventId: 'getAvailableCrawlers' });
  });

  onDestroy(() => {
    removeEventListener();
  });
</script>

<BreadCrumbs />
<div class="p-4">
  <div class="text-2xl">Active Crawlers</div>
  <div class="mt-4 border rounded-md bg-slate-800 border-slate-700">
    {#each availableCrawlers as crawler (crawler)}
      <CrawlerListItem {crawler} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
<div class="p-4 mt-6">
  <div class="text-2xl">Available Crawlers</div>
  <div class="mt-4 border rounded-md bg-slate-800 border-slate-700">
    {#each availableCrawlers as crawler (crawler)}
      <CrawlerListItem {crawler} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
