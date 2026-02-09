<script lang="ts">
    import ToggleSwitch from "./ToggleSwitch.svelte";
    import Sun from "$lib/icons/Sun.svelte";
    import Moon from "$lib/icons/Moon.svelte";
    import { theme, toggleTheme } from "$lib/stores/theme";
</script>

<ToggleSwitch
    onToggle={toggleTheme}
    onLabel={Sun}
    onLabelProps={{ size: 22, class: "text-amber-200", ariaLabel: 'sun' }}
    offLabel={Moon}
    offLabelProps={{ size: 22, class: "text-slate-100", ariaLabel: 'moon' }}
    checked={$theme === "dark"}
    scale={0.75}
/>
