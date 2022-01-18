<script>
  import Icon from 'svelte-awesome';
  import { angleRight } from 'svelte-awesome/icons';
  import { Link } from 'svelte-navigator';
  import PageTitle from '../../../components/common/PageTitle.svelte';
  import NavLink from './components/NavLink.svelte';

  let links = [{ title: 'Crawlers', path: 'crawlers' }];
</script>

<PageTitle>Settings</PageTitle>
<div class="px-4">
  <div class="border rounded-md bg-slate-800 border-slate-700">
    {#each links as link}
      <NavLink to={link.path ?? '/'} linkTitle={link.title ?? 'N/A'} iconData={angleRight} />
    {/each}
  </div>
</div>
