<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchCurrentUser, currentUser, logout } from '$lib/auth';
	import { initTheme } from '$lib/stores/theme';
	import Header from '$lib/components/Header.svelte';
	import "../app.css";

	let { children } = $props();
	
	onMount(() => {
		fetchCurrentUser();
		initTheme();
	});
</script>

<Header />
{@render children()}
