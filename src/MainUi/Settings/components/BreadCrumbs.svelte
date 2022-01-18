<script>
  import { Icon } from 'svelte-awesome';
  import { angleLeft } from 'svelte-awesome/icons';
  import { Link, useLocation } from 'svelte-navigator';

  const location = useLocation();

  $: breadCrumbs = $location.state.breadCrumbs;
  $: breadCrumbsLinks = breadCrumbs.filter((item, index) => index < breadCrumbs.length - 1);
  $: breadCrumbsTitular = breadCrumbs[breadCrumbs.length - 1];
</script>

<div class="flex items-center px-4 py-6">
  <Link to="../">
    <Icon data={angleLeft} class="w-6 h-6 mr-6" />
  </Link>
  {#each breadCrumbsLinks as crumb, index}
    <Link
      to={crumb.path}
      class={`text-2xl text-slate-500 hover:text-slate-200 hover:underline ${
        index < breadCrumbs.length - 1 ? 'mr-3' : ''
      }`}>{crumb.name}</Link
    >
    <span class="mr-3 text-2xl font-bold text-slate-500">/</span>
  {/each}
  <div class="text-2xl font-semibold text-white">{breadCrumbsTitular.name}</div>
</div>
