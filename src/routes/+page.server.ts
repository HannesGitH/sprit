import { error } from '@sveltejs/kit';

import { load as dload } from 'ts-dotenv';

const env = dload({ mapbox_api_key: String });

import type { PageServerLoad } from './$types';

export type Data = {
	mapbox_api_key: string;
};

export const load: PageServerLoad<Data> = async ({ params }: any) => {
	return {
		mapbox_api_key: env.mapbox_api_key
	};

	throw error(404, 'Not found');
};
