<script>
  import PageTitle from 'src/components/common/PageTitle.svelte';
  import { crawlersStore } from 'src/stores/crawlers';
  import ReadingItem from './components/ReadingItem.svelte';

  // your script goes here
</script>

<PageTitle>Reading</PageTitle>

<div class="px-6 space-y-4">
  {#each $crawlersStore.active as crawler, i (crawler.name)}
    <ReadingItem {crawler} />
  {/each}
</div>
