<script>
  import { Router } from 'svelte-navigator';
  import MainUi from './MainUi/MainUi.svelte';
  import Sidebar from './components/Sidebar/Sidebar.svelte';

  // @ts-ignore
  window.api.receive('receiveIpcEvent', (data) => {
    console.log(data);
  });
  // @ts-ignore
  window.api.send('launchIpcEvent', { eventId: 'getAvailableCrawlers' });
</script>

<main class="flex flex-row w-screen h-screen dark:bg-slate-900 dark:text-white">
  <Router primary={false}>
    <Sidebar />
    <div class="flex-grow">
      <MainUi />
    </div>
  </Router>
</main>
