<script>
  import Icon from 'svelte-awesome';
  import { Link } from 'svelte-navigator';

  export let to;
  export let linkTitle;
  export let iconData;
</script>

<Link
  {to}
  class="flex items-center justify-between px-6 py-4 transition-colors border-b last:border-b-0 hover:bg-slate-700 border-slate-700 first:rounded-t-md last:rounded-b-md"
>
  <span class="text-2xl">{linkTitle}</span>
  <Icon data={iconData} class="w-6 h-6" />
</Link>
