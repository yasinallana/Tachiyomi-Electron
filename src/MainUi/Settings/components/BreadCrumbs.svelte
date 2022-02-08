<script>
  import { Icon } from 'svelte-awesome';
  import { angleLeft } from 'svelte-awesome/icons';
  import { Link, useLocation } from 'svelte-navigator';

  const location = useLocation();

  let breadCrumbsLinks = [];
  let breadCrumbsTitular = '';

  const processBreadCrumbs = (breadCrumbs) => {
    if (Array.isArray(breadCrumbs) && breadCrumbs.length > 1) {
      breadCrumbsLinks = breadCrumbs.filter((item, index) => index < breadCrumbs.length - 1);
      breadCrumbsTitular = breadCrumbs[breadCrumbs.length - 1] ?? 'N/A';
    }
  };

  const generateParentalPath = (currentIndex) => {
    let crumbsHistory = [];

    let indexCopy = currentIndex;

    while (indexCopy < breadCrumbsLinks.length) {
      crumbsHistory.splice(0, 0, '../');
      indexCopy++;
    }

    return crumbsHistory.join('');
  };

  $: breadCrumbs = $location.pathname.split('/').filter((el) => el != '');
  $: processBreadCrumbs(breadCrumbs);
</script>

<div class="flex items-center px-4 py-6">
  <Link to="../">
    <Icon data={angleLeft} class="w-6 h-6 mr-6" />
  </Link>
  {#each breadCrumbsLinks as crumb, index}
    <Link
      to={generateParentalPath(index)}
      class={`text-2xl text-slate-500 hover:text-slate-200 hover:underline capitalize ${
        index < breadCrumbsLinks.length ? 'mr-3' : ''
      }`}>{crumb}</Link
    >
    <span class="mr-3 text-2xl font-bold text-slate-500">/</span>
  {/each}
  <div class="text-2xl font-semibold text-white capitalize">{breadCrumbsTitular}</div>
</div>
