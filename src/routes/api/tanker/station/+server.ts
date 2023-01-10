import { getStation } from '$lib/helpers/tankerkoenig.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const stationId = url.searchParams.get('id');
	if (!stationId) {
		throw error(400, 'Bad Request, please provide a station id');
	}

	const station = await getStation(stationId);

	return new Response(JSON.stringify(station));
};
