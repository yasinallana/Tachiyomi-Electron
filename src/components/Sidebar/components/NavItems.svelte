<script>
  import NavLink from '../../common/NavLink.svelte';
  import Icon from 'svelte-awesome';

  export let link = {};
</script>

<NavLink
  to={link.path}
  cssClass="flex flex-col items-center justify-center w-24 h-24 mb-4 rounded-md last:mb-0"
  activeCssClass="dark:bg-slate-900"
  inActiveCssClass="dark:bg-slate-700"
>
  <Icon data={link.icon} class="w-8 h-8 mb-2" />
  <div>
    {link.name}
  </div>
</NavLink>
