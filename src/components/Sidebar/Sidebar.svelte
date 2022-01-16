<script>
  import { home, compass, gears } from 'svelte-awesome/icons';
  import NavItems from './components/NavItems.svelte';
  import appIcon from '../../assets/logo.png';
  import NavLink from '../common/NavLink.svelte';
  import Icon from 'svelte-awesome';

  const routes = [
    {
      id: 1,
      icon: home,
      path: '/',
    },
    {
      id: 2,
      icon: compass,
      path: 'discover',
    },
  ];
</script>

<div class="flex flex-col shadow-md dark:bg-slate-800">
  <img src={appIcon} alt="Application Icon" class="self-center mt-2 w-14 h-14" />
  <div class="flex flex-col justify-center flex-grow px-2">
    {#each routes as route (route.id)}
      <NavItems link={route} />
    {/each}
  </div>

  <div class="flex justify-center">
    <NavLink
      to="settings"
      cssClass="mb-2 rounded-md p-3"
      activeCssClass="dark:bg-slate-900"
      inActiveCssClass="dark:bg-slate-700"
    >
      <Icon data={gears} class="w-8 h-8" />
    </NavLink>
  </div>
</div>
