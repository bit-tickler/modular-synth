<script lang="ts">
  import { currentUser } from '$lib/auth';
  import * as jdenticon from 'jdenticon';   // ← THIS is the fix

  jdenticon.configure({
    lightness: { color: [0.4, 0.8], grayscale: [0.3, 0.9] },
    saturation: { color: 0.95, grayscale: 0.1 },
    backColor: '#00000000'
  });

  $: value = $currentUser?.username ?? 'guest';
  $: size = 38;

  $: avatarSvg = jdenticon.toSvg(value, size);
</script>

<div class="grid items-center">
  <div class="rounded-full overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
    {@html avatarSvg}
  </div>
  <span>{$currentUser?.username || "guest"}</span>
</div>
