import { derived, writable } from 'svelte/store';

import type { Station, StationParams } from '$lib/helpers/tankerkoenig.server';
import { distance, position, type PositionWithRadius } from '$lib/helpers/position';

export const nearbyStations = writable<Station[]>([]);

let lastPos = { lat: 0, lng: 0, lastUpdatedTimeStamp: -1 };

position.subscribe(async (pos) => {
	if (distance(pos, lastPos) > 1000) {
		updateNearbyStations({ ...pos, rad: 4 });
		lastPos = pos;
	}
});

export const updateNearbyStations = async (pos: PositionWithRadius | StationParams) => {
	const stations: [Station] = await (
		await fetch('/api/tanker?lat=' + pos.lat + '&lng=' + pos.lng + '&type=all' + '&rad=' + pos.rad)
	).json();
	nearbyStations.set(stations);
	console.log('nearby stations updated', stations);
};
