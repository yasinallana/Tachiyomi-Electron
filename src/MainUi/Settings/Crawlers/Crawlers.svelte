<script>
  import BreadCrumbs from 'src/MainUi/Settings/components/BreadCrumbs.svelte';
  import { onDestroy, onMount } from 'svelte';
  import CrawlerListItem from './components/CrawlerListItem.svelte';
  import NoCrawlers from './components/NoCrawlers.svelte';
  import { crawlersStore } from 'src/stores/crawlers';

  // @ts-ignore
  const removeEventListener = window.ipc.receive('receiveIpcEvent', (data) => {
    if (data.eventId === 'setActivationStatus') {
      const { fileIndex, newStatus } = data;
      if (newStatus) {
        crawlersStore.activate(fileIndex);
      } else {
        crawlersStore.deactivate(fileIndex);
      }
    }
  });
  onDestroy(() => {
    removeEventListener();
  });

  // Activation change
  const activationChange = ({ detail }) => {
    const { active, file, index } = detail;

    // @ts-ignore
    window.ipc.send('sendIpcEvent', { eventId: 'changeCrawlerStatus', file, fileIndex: index, newStatus: active });
  };
</script>

<BreadCrumbs />
<div class="p-4">
  <div class="text-2xl">Active Crawlers</div>
  <div class="mt-4 border rounded-md bg-slate-800 border-slate-700">
    {#each $crawlersStore.active as crawler, index (crawler)}
      <CrawlerListItem {crawler} active={true} {index} on:activationChange={activationChange} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
<div class="p-4 mt-6">
  <div class="text-2xl">Available Crawlers</div>
  <div class="mt-4 border rounded-md bg-slate-800 border-slate-700">
    {#each $crawlersStore.inactive as crawler, index (crawler)}
      <CrawlerListItem {crawler} {index} on:activationChange={activationChange} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
