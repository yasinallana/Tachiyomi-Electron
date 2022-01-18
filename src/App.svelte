<script>
  import { Router } from 'svelte-navigator';
  import Sidebar from './components/Sidebar/Sidebar.svelte';
  import MainUi from './MainUi/MainUi.svelte';
</script>

<main class="flex flex-row w-screen h-screen dark:bg-slate-900 dark:text-white">
  <Router primary={false}>
    <Sidebar />
    <div class="flex-grow">
      <MainUi />
    </div>
  </Router>
</main>
