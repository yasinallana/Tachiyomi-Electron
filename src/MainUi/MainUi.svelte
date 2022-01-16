<script>
  // your script goes here

  import { Route } from 'svelte-navigator';
  import Home from './Home/Home.svelte';
  import Discover from './Discover/Discover.svelte';
  import Settings from './Settings/Settings.svelte';

  const routes = [
    {
      id: 1,
      path: '/',
      component: Home,
    },
    {
      id: 2,
      path: 'discover',
      component: Discover,
    },
    {
      id: 3,
      path: 'settings/*',
      component: Settings,
    },
  ];
</script>

{#each routes as route (route.id)}
  <Route path={route.path}>
    <svelte:component this={route.component} />
  </Route>
{/each}
