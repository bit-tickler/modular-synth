import { writable } from 'svelte/store';

export type User = { id: string; username: string } | null;

export const currentUser = writable<User>(null);

export async function fetchCurrentUser() {
	try {
		const res = await fetch('/auth/me', { credentials: 'include' });
		console.log('fetchCurrentUser status', res.status);
		const data = await res.json();
		console.log('fetchCurrentUser body', data);
		
		currentUser.set(data.user);
	} catch (err) {
		console.error('fetchCurrentUser error', err);
		currentUser.set(null);
	}
}

export async function logout() {
	await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
	currentUser.set(null);
}
