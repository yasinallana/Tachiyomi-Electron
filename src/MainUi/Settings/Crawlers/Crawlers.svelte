<script>
  import BreadCrumbs from 'src/MainUi/Settings/components/BreadCrumbs.svelte';
  import { onDestroy, onMount } from 'svelte';
  import CrawlerListItem from './components/CrawlerListItem.svelte';
  import NoCrawlers from './components/NoCrawlers.svelte';

  let activeCrawlers = [];
  let availableCrawlers = [];

  const moveBetweenTwoArrays = (fromList, toList, index, sortingFunction) => {
    let arrayA = fromList;
    let arrayB = toList;

    let arrayAItem = arrayA[index];
    arrayA = arrayA.filter((el, i) => i != index);

    arrayB = [...arrayB, arrayAItem];

    arrayB = arrayB.sort(sortingFunction);

    return { fromList: arrayA, toList: arrayB };
  };

  // @ts-ignore
  const removeEventListener = window.ipc.receive('receiveIpcEvent', (data) => {
    if (data.eventId === 'setAvailableCrawlers') {
      availableCrawlers = data.availableCrawlers;
    }

    if (data.eventId === 'setActiveCrawlers') {
      activeCrawlers = data.activeCrawlers;
    }

    if (data.eventId === 'setActivationStatus') {
      const { fileIndex, newStatus } = data;
      if (newStatus) {
        const { fromList, toList } = moveBetweenTwoArrays(availableCrawlers, activeCrawlers, fileIndex, (a, b) =>
          a.name.localeCompare(b.name)
        );

        activeCrawlers = toList;
        availableCrawlers = fromList;
      } else {
        const { fromList, toList } = moveBetweenTwoArrays(activeCrawlers, availableCrawlers, fileIndex, (a, b) =>
          a.name.localeCompare(b.name)
        );

        activeCrawlers = fromList;
        availableCrawlers = toList;
      }
    }
  });

  onMount(() => {
    // @ts-ignore
    window.ipc.send('sendIpcEvent', { eventId: 'getActiveCrawlers' });
    // @ts-ignore
    window.ipc.send('sendIpcEvent', { eventId: 'getAvailableCrawlers' });
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
    {#each activeCrawlers as crawler, index (crawler)}
      <CrawlerListItem {crawler} active={true} {index} on:activationChange={activationChange} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
<div class="p-4 mt-6">
  <div class="text-2xl">Available Crawlers</div>
  <div class="mt-4 border rounded-md bg-slate-800 border-slate-700">
    {#each availableCrawlers as crawler, index (crawler)}
      <CrawlerListItem {crawler} {index} on:activationChange={activationChange} />
    {:else}
      <NoCrawlers />
    {/each}
  </div>
</div>
