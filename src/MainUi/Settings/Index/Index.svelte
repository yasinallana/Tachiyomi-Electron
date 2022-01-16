<script>
  import PageTitle from '../../../components/common/PageTitle.svelte';
  import { Link } from 'svelte-navigator';
  import { angleRight } from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';

  let links = [{ title: 'Crawlers', path: 'crawlers' }];
</script>

<PageTitle>Settings</PageTitle>
<div class="px-4">
  <div class="border rounded-md bg-slate-800 border-slate-700">
    {#each links as link}
      <Link
        to={link.path ?? '/'}
        class="flex items-center justify-between px-6 py-4 transition-colors border-b last:border-b-0 hover:bg-slate-700 border-slate-700 first:rounded-t-md last:rounded-b-md"
      >
        <span class="text-2xl">{link.title ?? 'N/A'}</span>
        <Icon data={angleRight} class="w-6 h-6" />
      </Link>
    {/each}
  </div>
</div>
