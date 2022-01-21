<script>
  import ToggleSwitch from 'src/components/common/ToggleSwitch.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let crawler;
  export let index;
  export let active = false;

  // PRocessing
  let processingActivation = false;

  function toggle() {
    processingActivation = true;
    dispatch('activationChange', {
      active: !active,
      file: crawler.file,
      index,
    });
  }
</script>

<div
  class="flex items-center justify-between p-2 transition-colors border-b last:border-b-0 hover:bg-slate-700 border-slate-700 first:rounded-t-md last:rounded-b-md"
  on:click={toggle}
>
  <div class="flex items-center">
    <img src={crawler.icon} alt="{crawler.name} icon" class="w-16" />
    <div class="ml-2">
      <div class="text-lg font-semibold">Title</div>
      <div class="text-md text-slate-300">{crawler.description}</div>
      <div class="text-xs text-slate-500">v {crawler.version}</div>
    </div>
  </div>
  <ToggleSwitch {active} processing={processingActivation} />
</div>
