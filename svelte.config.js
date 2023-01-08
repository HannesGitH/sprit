import { load } from 'ts-dotenv';

const env = load({});

import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			scss: {
				prependData: `@use 'src/style/app.scss' as *;`
			}
		}),
		vitePreprocess({})
	],

	kit: {
		adapter: env.ADAPTER === 'node' ? adapterNode({ out: 'dist' }) : adapterAuto()
	}
};

export default config;
