<script>
  import Icon from 'svelte-awesome';
  import { chevronUp, refresh } from 'svelte-awesome/icons';

  export let title = '';
  export let expanded = false;

  const toggleExpansion = () => (expanded = !expanded);
</script>

<div>
  <div
    class="py-3 px-4 text-2xl border-[1px] border-slate-700 cursor-pointer rounded-sm font-weight-bold bg-slate-800 flex items-center justify-between"
  >
    <div class="inline-flex items-center leading-3">{title}</div>
    <div class="flex items-center">
      <button
        class={`inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-slate-700 bg-slate-900 transition-all ${
          expanded ? 'rotate-0' : 'rotate-180'
        } transform-gpu `}
        on:click={toggleExpansion}
      >
        <Icon data={chevronUp} class="relative -top-[2px]" />
      </button>
      {#if $$slots.actions}
        <div class="ml-3">
          <slot name="actions" />
        </div>
      {/if}
    </div>
  </div>
  {#if expanded}
    <!-- content here -->
    <div class="p-6 rounded-b bg-slate-600">
      <slot />
    </div>
  {/if}
</div>
