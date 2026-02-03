import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		// Monorepo alias (SvelteKit-approved way)
		alias: {
			'audio-engine': '../../packages/audio-engine/src',
			'audio-engine/*': '../../packages/audio-engine/src/*'
		}
	}
};

export default config;
