<script>
  import { Route } from 'svelte-navigator';
  import Crawlers from './Crawlers/Crawlers.svelte';
  import Index from './Index/Index.svelte';
</script>

<Route path="crawlers">
  <Crawlers />
</Route>
<Route path="/">
  <Index />
</Route>
