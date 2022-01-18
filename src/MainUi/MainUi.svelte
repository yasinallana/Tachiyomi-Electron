<script>
  import { Route } from 'svelte-navigator';
  import Discover from './Discover/Discover.svelte';
  import Home from './Home/Home.svelte';
  import Settings from './Settings/Settings.svelte';
</script>

<Route path="discover">
  <Discover />
</Route>
<Route path="settings/*">
  <Settings />
</Route>
<Route path="/">
  <Home />
</Route>
