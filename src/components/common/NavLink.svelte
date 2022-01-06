<script>
  import { Link } from 'svelte-navigator';

  export let to = '';
  export let cssClass = '';
  export let activeCssClass = '';
  export let inActiveCssClass = '';

  let active = false;

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    active = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    return {};
  }
</script>

<Link {to} {getProps} class={`${cssClass} ${active ? activeCssClass : inActiveCssClass}`} let:params>
  <slot />
</Link>
