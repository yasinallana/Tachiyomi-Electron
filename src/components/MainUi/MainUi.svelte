<script>
  // your script goes here

  import { Route } from 'svelte-navigator';
  import Home from './Home/Home.svelte';
  import Reading from './Reading/reading.svelte';
  import Settings from './Settings/Settings.svelte';

  const routes = [
    {
      id: 1,
      path: '/',
      component: Home,
    },
    {
      id: 2,
      path: '/reading',
      component: Reading,
    },
    {
      id: 3,
      path: '/settings',
      component: Settings,
    },
  ];
</script>

Main content

<br />
<br />
<br />

{#each routes as route (route.id)}
  <Route path={route.path}>
    <svelte:component this={route.component} />
  </Route>
{/each}
