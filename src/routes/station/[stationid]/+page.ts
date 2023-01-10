import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import type { Station } from '$lib/helpers/tankerkoenig.server';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/tanker/station?id=${params.stationid}`);
	if (!res.ok) {
		throw error(404, 'Not found');
	}
	const station: Station = await res.json();
	return { station };
};
