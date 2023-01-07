import { error } from '@sveltejs/kit';

import * as denv from 'ts-dotenv';
const env = denv.load({ mapbox_api_key: String });

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
