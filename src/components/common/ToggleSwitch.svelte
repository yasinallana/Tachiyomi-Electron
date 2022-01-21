<script>
  import Spinner from './Spinner.svelte';

  export let processing = false;
  export let active = false;
</script>

{#if processing}
  <div class="w-12">
    <Spinner />
  </div>
{:else}
  <div class={`transition-all relative w-12 h-3 rounded-full ${active ? 'bg-green-400' : 'bg-slate-900'}`}>
    <div
      class={`transition-all transform absolute w-6 h-6 rounded-full  shadow-lg -top-1.5 ${
        active ? 'bg-gray-300 translate-x-full' : 'bg-slate-400'
      }`}
    />
  </div>
{/if}
