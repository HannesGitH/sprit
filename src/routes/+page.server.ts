import { error } from '@sveltejs/kit';

// sadly ts-config doenst work so the next 4 lines are hotfixing that
// import { load as dload } from 'ts-dotenv';
import * as dotenv from 'dotenv';
dotenv.config();
const dload = (options: any) => process.env;

const env = dload({ mapbox_api_key: String });

import type { PageServerLoad } from './$types';

export type Data = {
	mapbox_api_key: string;
};

export const load: PageServerLoad<Data> = async ({ params }: any) => {
	return {
		mapbox_api_key:
			env.mapbox_api_key ??
			'pk.eyJ1IjoiaGFubmVzb213IiwiYSI6ImNrM3NlbXc4czA0N3Yzbm8xcTF2azdxMzUifQ.qgd9llxTGr6HvXQwcz99Cg'
	};

	throw error(404, 'Not found');
};
