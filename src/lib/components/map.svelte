<script lang="ts">
	export let api_key: string;

	export let rotation = 0;
	export const setRotation = (value: number) => {
		map && map.rotateTo(value);
	};
	export let center: PositionWithRadius = { lng: 13, lat: 52, rad: 12 };

	import {
		position,
		isPositionKnown,
		distance,
		type PositionWithRadius
	} from '$lib/helpers/position';
	import { nearbyStations } from '$lib/helpers/stores';

	import mapboxgl from 'mapbox-gl';
	let map: mapboxgl.Map;
	let userLocationMarker: mapboxgl.Marker;
	let positionMarker: HTMLElement;
	import { onMount } from 'svelte';
	onMount(() => {
		mapboxgl.accessToken = api_key;
		map = new mapboxgl.Map({
			container: 'map', // container ID
			// projection: {name:'globe'},
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: [13, 52], // starting position [lng, lat]
			zoom: 9 // starting zoom
			// attributionControl: false,
		});
		userLocationMarker = new mapboxgl.Marker({
			color: '#000',
			draggable: false,
			element: positionMarker
		})
			.setLngLat([13, 52])
			.addTo(map);

		map.on('rotate', () => {
			rotation = map.getBearing();
		});
		map.on('dragend', () => {
			center = {
				lng: map.getCenter().lng,
				lat: map.getCenter().lat,
				rad: distance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2
			};
		});
	});

	isPositionKnown.subscribe((value) => {
		if (value && map) {
			map.panTo([$position.lng, $position.lat]);
			map.setCenter([$position.lng, $position.lat]);
			map.zoomTo(12);
		}
	});
	$: userLocationMarker && userLocationMarker.setLngLat([$position.lng, $position.lat]);

	let stationMarkers: mapboxgl.Marker[] = [];

	$: {
		if (map && $nearbyStations) {
			stationMarkers.forEach((marker) => marker.remove());
			$nearbyStations.forEach((station) => {
				stationMarkers.push(
					new mapboxgl.Marker({
						color: 'green',
						draggable: false
					})
						.setLngLat([station.lng, station.lat])
						.addTo(map)
				);
			});
		}
	}
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" />

<div
	id="positionmarker"
	bind:this={positionMarker}
	class:stale={!$isPositionKnown}
	hidden={!$isPositionKnown}
>
	<div class="mapboxgl-user-location-dot" />
</div>

<style lang="scss">
	@use 'sass:color';

	#map {
		width: 100%;
		height: 100%;
	}
	$user-location-color: $primary-darker;

	#positionmarker {
		position: absolute;

		.mapboxgl-user-location-dot {
			pointer-events: none;
			position: absolute;
			background-color: $user-location-color;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
			transform: translate(-50%, -50%);

			&::before {
				background-color: $user-location-color;
				content: '';
				width: 15px;
				height: 15px;
				border-radius: 50%;
				position: absolute;
				animation: mapboxgl-user-location-dot-pulse 3s infinite;
			}

			&::after {
				border-radius: 50%;
				border: 2px solid #fff;
				content: '';
				height: 19px;
				left: -2px;
				position: absolute;
				top: -2px;
				width: 19px;
				box-sizing: border-box;
			}
		}

		@keyframes mapboxgl-user-location-dot-pulse {
			0% {
				transform: scale(1);
				opacity: 1;
			}
			70% {
				transform: scale(3);
				opacity: 0;
			}
			100% {
				transform: scale(1);
				opacity: 0;
			}
		}

		&.stale {
			background-color: #aaa;
		}

		&.stale::after {
			display: none;
		}
	}
</style>
