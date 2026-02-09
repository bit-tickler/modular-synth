<script lang="ts">
  export let size: number = 20;
  export let fill: string = "currentColor";
  export let ariaLabel: string | undefined = undefined;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  {fill}
  role={ariaLabel ? "img" : undefined}
  aria-hidden={ariaLabel ? undefined : true}
  aria-label={ariaLabel}
  {...$$restProps}
>
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>
