<script>
  import Icon from 'svelte-awesome';
  import NavLink from '../../common/NavLink.svelte';

  export let link = {};
</script>

<NavLink
  to={link.path}
  cssClass="mb-4 rounded-md last:mb-0 p-3"
  activeCssClass="dark:bg-slate-900"
  inActiveCssClass="dark:bg-slate-700"
>
  <Icon data={link.icon} class="w-8 h-8" />
</NavLink>
