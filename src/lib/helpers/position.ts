import { derived, writable } from 'svelte/store';

export interface PositionLike {
	lat: number;
	lng: number;
}
export interface Position extends PositionLike {
	lastUpdatedTimeStamp: number;
}
export interface PositionWithRadius extends PositionLike {
	rad: number;
}

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
		if (watch)
			watchId = navigator.geolocation.watchPosition(posCB, errCB, { enableHighAccuracy: false });
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

export const distance = (p1: PositionLike, p2: PositionLike) => {
	const R = 6371e3; // metres
	const φ1 = (p1.lat * Math.PI) / 180; // φ, λ in radians
	const φ2 = (p2.lat * Math.PI) / 180;
	const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
	const Δλ = ((p2.lng - p1.lng) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // in metres
};
