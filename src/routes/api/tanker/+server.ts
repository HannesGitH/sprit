import { getStations } from '$lib/helpers/tankerkoenig.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const lat = Number(url.searchParams.get('lat') ?? '52');
	const lng = Number(url.searchParams.get('lng') ?? '13');
	const type = url.searchParams.get('type') ?? 'all';

	const stations = await getStations({
		lat,
		lng,
		rad: 4,
		sort: type == 'all' ? 'dist' : 'price',
		type: type as any
	});

	return new Response(JSON.stringify(stations));
};
