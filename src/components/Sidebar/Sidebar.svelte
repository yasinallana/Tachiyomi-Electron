<script>
  import { home, book, gears } from 'svelte-awesome/icons';
  import NavItems from './components/NavItems.svelte';
  import appIcon from '../../assets/logo.png';
  import NavLink from '../common/NavLink.svelte';
  import Icon from 'svelte-awesome';

  const routes = [
    {
      id: 1,
      name: 'Home',
      icon: home,
      path: '/',
    },
    {
      id: 2,
      name: 'Reading',
      icon: book,
      path: '/reading',
    },
  ];
</script>

<div class="flex flex-col shadow-md dark:bg-slate-800">
  <div class="flex justify-center my-2">
    <img src={appIcon} alt="Application Icon" class="w-14 h-14" />
  </div>
  <div class="flex flex-col justify-center flex-grow px-2">
    {#each routes as route (route.id)}
      <NavItems link={route} />
    {/each}
  </div>

  <div class="flex justify-center">
    <NavLink
      to="/settings"
      cssClass="flex items-center justify-center w-24 py-2 mb-2 rounded-md"
      activeCssClass="dark:bg-slate-900"
      inActiveCssClass="dark:bg-slate-700"
    >
      <Icon data={gears} class="w-4 h-4 mr-2" />
      <div>Setting</div>
    </NavLink>
  </div>
</div>
