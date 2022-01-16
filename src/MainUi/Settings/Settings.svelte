<script>
  import { Route } from 'svelte-navigator';
  import Index from './Index/Index.svelte';
  import Crawlers from './Crawlers/Crawlers.svelte';

  let availableCrawlers = ['aa', 'bb'];
  // @ts-ignore
  window.api.receive('receiveIpcEvent', (data) => {
    console.log(data);
  });
  // @ts-ignore
  window.api.send('sendIpcEvent', { eventId: 'getAvailableCrawlers' });
</script>

<Route path="/">
  <Index />
</Route>
<Route path="crawlers">
  <Crawlers />
</Route>
