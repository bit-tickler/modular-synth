import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const THEME_KEY = 'modular_synth:theme';

export const theme = writable<Theme>('light');

export function initTheme() {
	if (!browser) return;

	const saved = localStorage.getItem(THEME_KEY) as Theme | null;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	const initial = saved ?? (prefersDark ? 'dark' : 'light');

	theme.set(initial);
	applyTheme(initial);
}

export function toggleTheme() {
	if (!browser) return;

	const current = get(theme);
	const newTheme = current === 'light' ? 'dark' : 'light';

	theme.set(newTheme);
	localStorage.setItem(THEME_KEY, newTheme);
	applyTheme(newTheme);
}

function applyTheme(mode: Theme) {
	document.documentElement.classList.toggle('dark', mode === 'dark');
	localStorage.setItem(THEME_KEY, mode);
}
