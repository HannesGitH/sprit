import { derived, writable } from 'svelte/store';

export type Position = {
	lat: number;
	lng: number;
	lastUpdatedTimeStamp: number;
};

const unknownPosition: Position = { lat: 0, lng: 0, lastUpdatedTimeStamp: -1 };
export const position = writable(unknownPosition);
export const isPositionKnown = derived(position, ($position) => {
	return $position.lastUpdatedTimeStamp > 0;
});

let watchId: number | null = null;

export const start = (watch = true) => {
	if (navigator.geolocation) {
		const posCB = (pos: GeolocationPosition) => {
			position.set({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
				lastUpdatedTimeStamp: pos.timestamp
			});
		};
		const errCB = (err: GeolocationPositionError) => {
			console.error(err);
		};
		if (watch) watchId = navigator.geolocation.watchPosition(posCB, errCB);
		else navigator.geolocation.getCurrentPosition(posCB, errCB);
	}
};

export const stop = () => {
	if (navigator.geolocation && watchId) {
		navigator.geolocation.clearWatch(watchId!);
		position.set(unknownPosition);
	}
	watchId = null;
};

export const toggle = () => {
	if (watchId) stop();
	else start(true);
};
