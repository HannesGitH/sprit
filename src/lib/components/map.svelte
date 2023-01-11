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
	import { onMount, afterUpdate } from 'svelte';
	onMount(() => {
		mapboxgl.accessToken = api_key;
		map = new mapboxgl.Map({
			container: 'map', // container ID
			// projection: {name:'globe'},
			style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
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
		// map.touchZoomRotate.enable();
		// map.boxZoom.enable();
		// map.dragPan.enable();
		// map.dragRotate.enable();
		// map.keyboard.enable();
		// map.scrollZoom.enable();
	});

	isPositionKnown.subscribe((value) => {
		if (value && map) {
			map.panTo([$position.lng, $position.lat]);
			map.setCenter([$position.lng, $position.lat]);
			map.zoomTo(12);
		}
	});
	$: userLocationMarker && userLocationMarker.setLngLat([$position.lng, $position.lat]);

	let stationMarkersDirty = false;
	let stationMarkers: mapboxgl.Marker[] = [];
	let stationMarkerElems: HTMLElement[] = [];

	let chosenFuel: 'all' | 'diesel' | 'e5' | 'e10' = 'all';

	import type { MultiplePriceStation, SinglePriceStation } from '$lib/helpers/tankerkoenig.server';
	import Price from './marker/price.svelte';

	nearbyStations.subscribe(async ($nearbyStations) => {
		if (map && $nearbyStations && Array.isArray($nearbyStations)) {
			console.log('rebuilt');

			stationMarkers.forEach((marker) => {
				marker.remove();
			});

			stationMarkerElems = $nearbyStations.map((station) => document.createElement('div'));
			stationMarkersDirty = true;
		}
	});

	afterUpdate(() => {
		if (!stationMarkersDirty) return;
		stationMarkersDirty = false;
		stationMarkers = $nearbyStations.map((station, i) => {
			return new mapboxgl.Marker({
				color: 'green',
				draggable: false,
				element: stationMarkerElems[i],
				anchor: 'bottom'
			})
				.setLngLat([station.lng, station.lat])
				.addTo(map);
		});
	});

	const getStation: any = (idx: number) => $nearbyStations[idx]; //sadly we need to erase the type for the stuff outside script to work, see https://github.com/sveltejs/svelte/issues/4701
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" />

<!-- sadly we can't use bind:this on dynamic lists -->
{#each stationMarkerElems as marker, index}
	{@const station = getStation(index)}
	<div bind:this={marker}>
		<div class="mapboxgl-station-location">
			<div class="mapboxgl-station-location-inner">
				<p class="name">{station.brand}</p>
				{#if station.price}
					<p class="price">{station.price}€</p>
					<Price name={chosenFuel} price={station.price} />
				{:else if chosenFuel === 'all'}
					<Price name="Diesel" price={station.diesel} />
					<Price name="e5" price={station.e5} />
					<Price name="e10" price={station.e10} />
				{:else}
					<Price name={chosenFuel} price={station[chosenFuel]} />
				{/if}
			</div>
			<div id="shadow" />
		</div>
	</div>
{/each}

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
	$user-location-color: $accent;

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

	.mapboxgl-station-location {
		$bg-color: #132323;
		$border-color: rgb(96, 166, 165);

		$blur-radius: 8px;
		position: relative;
		background: $bg-color;
		border: 1px solid $border-color;

		&:after,
		&:before {
			top: 100%;
			left: 50%;
			border: solid transparent;
			content: '';
			height: 0;
			width: 0;
			position: absolute;
			pointer-events: none;
		}

		&:after {
			border-color: rgba(255, 255, 255, 0);
			border-top-color: $bg-color;
			border-width: 10px;
			margin-left: -10px;
		}
		&:before {
			border-color: rgba(175, 219, 202, 0);
			border-top-color: $border-color;
			border-width: 12px;
			margin-left: -12px;
		}
		padding: 0.1rem 0.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 0.5rem rgba(0, 0, 0, 0.25);
		#shadow {
			z-index: -2;
			position: absolute;
			width: 80%;
			height: 0.5rem;
			background: #252d2ac2;
			left: 10%;
			bottom: -20px;
			border-radius: 100%;
			//blur
			filter: blur(0.3rem);
		}
		.mapboxgl-station-location-inner {
			width: 2rem;
			> p {
				margin: 0;
				padding: 0;
				color: rgb(255, 255, 255);
				font-weight: 300;
				// font-size: xx-large;
				&.name {
					font-size: xx-small;
					font-weight: lighter;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
</style>
