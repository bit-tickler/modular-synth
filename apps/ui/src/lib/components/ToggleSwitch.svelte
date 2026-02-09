<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type LabelContent = string | Component | Snippet;

  type Props = {
    onLabel?: LabelContent;
    onLabelProps?: Record<string, any>;
    offLabel?: LabelContent;
    offLabelProps?: Record<string, any>;
    checked?: boolean;
    onToggle?: (isDark: boolean) => void;
    scale?: number;   // ← 0.75, 1, 1.25, 1.5, etc.
  };

  let {
    onLabel,
    offLabel,
    onLabelProps = {},
    offLabelProps = {},
    checked = $bindable(false),
    onToggle = (_: boolean) => {},
    scale = 1,
  }: Props = $props();

  const isSnippet = (v: any): v is Snippet =>
    typeof v === "function" && v.length === 0;
</script>

<!-- Container that controls the entire scale -->
<div class="inline-block relative" style={`font-size: ${scale}rem;`}>

  <input
    type="checkbox"
    id="theme-switch"
    bind:checked
    onchange={() => onToggle(checked)}
    aria-label="Toggle dark mode"
    class="sr-only"
  />

  <label
    for="theme-switch"
    class="flex items-center justify-between 
           w-[3.5em] h-[1.75em] 
           bg-zinc-300 dark:bg-zinc-700 
           rounded-full p-[0.125em] cursor-pointer 
           relative shadow-inner transition-colors"
  >
    <!-- Light icon -->
    <span class="icon light flex items-center justify-center w-[1.5em] h-[1.5em] z-10">
      {#if typeof onLabel === "string"}
        {@html onLabel}
      {:else if isSnippet(onLabel)}
        {@render onLabel()}
      {:else if onLabel}
        <svelte:component this={onLabel} {...onLabelProps} />
      {/if}
    </span>

    <!-- Dark icon -->
    <span class="icon dark flex items-center justify-center w-[1.5em] h-[1.5em] z-10">
      {#if typeof offLabel === "string"}
        {@html offLabel}
      {:else if isSnippet(offLabel)}
        {@render offLabel()}
      {:else if offLabel}
        <svelte:component this={offLabel} {...offLabelProps} />
      {/if}
    </span>

    <!-- Sliding knob -->
    <span
      class="absolute top-[0.125em] left-[0.125em] 
             w-[1.5em] h-[1.5em] bg-white dark:bg-black rounded-full shadow-md 
             transition-transform duration-300 ease-out z-20
             {checked ? 'translate-x-[1.75em]' : ''}"
    ></span>
  </label>
</div>
