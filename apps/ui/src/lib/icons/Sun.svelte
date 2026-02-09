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
  <circle cx="12" cy="12" r="5" />
  <!-- Rays -->
  <path d="M12 1v2" stroke={fill} stroke-width="2" stroke-linecap="round" />
  <path d="M12 21v2" stroke={fill} stroke-width="2" stroke-linecap="round" />
  <path
    d="M4.22 4.22l1.42 1.42"
    stroke={fill}
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M18.36 18.36l1.42 1.42"
    stroke={fill}
    stroke-width="2"
    stroke-linecap="round"
  />
  <path d="M1 12h2" stroke={fill} stroke-width="2" stroke-linecap="round" />
  <path d="M21 12h2" stroke={fill} stroke-width="2" stroke-linecap="round" />
  <path
    d="M4.22 19.78l1.42-1.42"
    stroke={fill}
    stroke-width="2"
    stroke-linecap="round"
  />
  <path
    d="M18.36 5.64l1.42-1.42"
    stroke={fill}
    stroke-width="2"
    stroke-linecap="round"
  />
</svg>
