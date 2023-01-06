import {load} from 'ts-dotenv';

const env = load({ADAPTER: String});

import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';

import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: env.ADAPTER === 'node' ? adapterNode({ out: 'dist' }) : adapterAuto()
	}
};

export default config;
