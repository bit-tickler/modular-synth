<!-- apps/ui/src/lib/components/Header.svelte -->
<script lang="ts">
	import { currentUser, fetchCurrentUser, logout } from '$lib/auth';
	import { onMount } from 'svelte';
	
	let showModal = false;
	let modalTab: 'login' | 'signup' = 'login';
	let username = '';
	let password = '';
	let error = '';
	let loading = false;
	let success = '';

	onMount(() => fetchCurrentUser());

	async function submit() {
		error = '';
		success = '';
		loading = true;

		const endpoint = modalTab === 'signup' ? '/auth/signup' : '/auth/login';

		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
				credentials: 'include'
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Authentication failed');
			}

			await fetchCurrentUser();

			success = modalTab === 'signup' 
				? 'Account created successfully!' 
				: 'Logged in successfully!';

			// Auto-close after successful login
			if (modalTab === 'login') {
				setTimeout(() => {
					showModal = false;
					username = password = '';
				}, 800);
			}
		} catch (err: any) {
			error = err.message || 'Something went wrong';
		} finally {
			loading = false;
		}
	}
</script>

<header class="bg-zinc-950 border-b border-zinc-700 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
	<div class="flex items-center gap-3">
		<h1 class="text-3xl font-bold tracking-tighter">Header Title</h1>
	</div>

	<div class="flex items-center gap-6">
		{#if $currentUser}
			<div class="flex items-center gap-4">
				<span class="text-sm text-zinc-400">Signed in as</span>
				<span class="font-medium">{$currentUser.username}</span>
				<button on:click={logout} class="text-sm px-4 py-1.5 bg-zinc-800 hover:bg-red-900/30 rounded-xl transition">Logout</button>
			</div>
		{:else}
			<button on:click={() => { modalTab = 'login'; showModal = true; }} class="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-sm font-medium">Login</button>
			<button on:click={() => { modalTab = 'signup'; showModal = true; }} class="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-medium">Sign Up</button>
		{/if}
	</div>
</header>

<!-- Modal -->
{#if showModal}
	<div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
		<div class="bg-zinc-900 w-full max-w-md rounded-3xl p-8 relative">
			<button on:click={() => showModal = false} class="absolute top-6 right-6 text-2xl text-zinc-400 hover:text-white">✕</button>

			<h2 class="text-2xl font-bold mb-8 text-center">
				{modalTab === 'login' ? 'Welcome back' : 'Create account'}
			</h2>

			<form on:submit|preventDefault={submit} class="space-y-6">
				<input bind:value={username} placeholder="Username" required class="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3" />
				<input type="password" bind:value={password} placeholder="Password" required class="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3" />

				{#if error}<p class="text-red-400 text-sm text-center">{error}</p>{/if}
				{#if success}<p class="text-green-400 text-sm text-center">{success}</p>{/if}

				<button type="submit" disabled={loading} class="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-semibold text-lg transition disabled:opacity-50">
					{loading ? 'Please wait...' : modalTab === 'login' ? 'Login' : 'Sign Up'}
				</button>
			</form>

			<button on:click={() => { modalTab = modalTab === 'login' ? 'signup' : 'login'; error = ''; }} class="mt-6 text-zinc-400 hover:text-white text-sm block mx-auto underline">
				{modalTab === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
			</button>
		</div>
	</div>
{/if}
