<script>
  import { onDestroy, onMount } from 'svelte';

  import { Router } from 'svelte-navigator';
  import Sidebar from './components/Sidebar/Sidebar.svelte';
  import MainUi from './MainUi/MainUi.svelte';
  import { crawlersStore } from 'src/stores/crawlers';

  onMount(() => {
    // @ts-ignore
    // window.ipc.send('sendIpcEvent', { eventId: 'getActiveCrawlers' });
    // @ts-ignore
    // window.ipc.send('sendIpcEvent', { eventId: 'getAvailableCrawlers' });

    window.ipc.send('sendIpcEvent', { eventId: 'executeCrawler', file: 'mangafox.js', functionToRun: 'discover' });
  });

  // @ts-ignore
  const removeEventListener = window.ipc.receive('receiveIpcEvent', (data) => {
    if (data.eventId === 'setAvailableCrawlers') {
      crawlersStore.init(data.availableCrawlers, 'inactive');
    }

    if (data.eventId === 'setActiveCrawlers') {
      crawlersStore.init(data.activeCrawlers, 'active');
    }
  });

  onDestroy(() => {
    removeEventListener();
  });
</script>

<main class="flex flex-row w-screen h-screen dark:bg-slate-900 dark:text-white">
  <Router primary={false}>
    <Sidebar />
    <div class="flex-grow">
      <MainUi />
    </div>
  </Router>
</main>
