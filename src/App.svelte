<script>
  import { Router } from 'svelte-navigator';
  import MainUi from './components/MainUi/MainUi.svelte';
  import Sidebar from './components/Sidebar/Sidebar.svelte';
</script>

<main class="flex flex-row w-screen h-screen dark:bg-slate-900 dark:text-white">
  <Router primary={false}>
    <Sidebar />
    <div class="flex-grow">
      <MainUi />
    </div>
  </Router>
</main>
