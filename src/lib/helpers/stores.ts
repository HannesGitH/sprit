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
		await fetch(
			'/api/tanker?lat=' +
				pos.lat +
				'&lng=' +
				pos.lng +
				'&type=' +
				((pos as StationParams).type ?? 'all') +
				'&rad=' +
				pos.rad
		)
	).json();
	if (Array.isArray(stations)) {
		nearbyStations.set(stations);
	}
};

export enum SortBy {
	DISTANCE = 'distance',
	DIESEL = 'diesel',
	E5 = 'e5',
	E10 = 'e10'
}

export const sortBy = writable<SortBy>(SortBy.DISTANCE);

export const orderedStations = derived([nearbyStations, sortBy], ([$nearbyStations, $sortBy]) => {
	return [...$nearbyStations].sort((a, b) => {
		if ($sortBy === SortBy.DISTANCE) {
			return a.dist - b.dist;
		} else {
			return ((a as any)[$sortBy] ?? 0) - ((b as any)[$sortBy] ?? 0);
		}
	});
});
