<script>
  import AccordionPanel from 'src/components/common/AccordionPanel.svelte';
  import Icon from 'svelte-awesome';
  import { download, refresh } from 'svelte-awesome/icons';

  export let crawler = {};

  const crawlerRefresh = (evt) => {
    // @ts-ignore
    window.ipc.send('sendIpcEvent', { eventId: 'executeCrawler', file: crawler.file });
  };
</script>

<AccordionPanel title={crawler.name} expanded={true} on:crawlerRefresh={crawlerRefresh}>
  <!-- Actions -->
  <button
    class="inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-slate-700 bg-slate-900"
    slot="actions"
    on:click={crawlerRefresh}
  >
    <Icon data={download} />
  </button>
  <!-- / Actions -->
  <!-- Main tiles-->
  <div>tiles go here</div>
  <!-- /Main tiles-->
</AccordionPanel>
