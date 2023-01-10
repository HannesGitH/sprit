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

	let stationMarkers: { marker: mapboxgl.Marker; elem?: HTMLElement }[] | false = false;
	let chosenFuel: 'all' | 'diesel' | 'e5' | 'e10' = 'all';

	import type { MultiplePriceStation, SinglePriceStation } from '$lib/helpers/tankerkoenig.server';
	$: {
		if (map && $nearbyStations) {
			Array.isArray(stationMarkers) &&
				stationMarkers.forEach((marker) => {
					marker.marker.remove();
				});
			stationMarkers =
				Array.isArray($nearbyStations) &&
				$nearbyStations.map((station) => {
					let elem = document.createElement('div');
					let priceHTML = '';
					if ((station as any).price) {
						const s = station as SinglePriceStation;
						priceHTML = `<p class="price">${s.price}</p>`;
					} else {
						const s = station as MultiplePriceStation;
						if (chosenFuel != 'all') priceHTML = `<p class="price">${s[chosenFuel]}</p>`;
						else
							priceHTML = `
						<p>${s.diesel}</p>
						<p>${s.e5}</p>
						<p>${s.e10}</p>
					`;
					}
					elem.innerHTML = `
					<div class="mapboxgl-station-location">
						<div class="mapboxgl-station-location-inner">
							<p class="name">${station.brand}</p>
							${priceHTML}
						</div>
    					<div id="shadow"></div>
					</div>
				`;
					return {
						marker: new mapboxgl.Marker({
							color: 'green',
							draggable: false,
							element: elem,
							anchor: 'bottom'
						})
							.setLngLat([station.lng, station.lat])
							.addTo(map),
						elem
					};
				});
		}
	}
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" />

<!-- sadly we can't use bind:this on dynamic lists -->
<!-- {#each stationMarkers as marker}
	<div bind:this={marker.elem}>
		uniquestring
	</div>
{/each} -->
{@debug $isPositionKnown}
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

	:global(.mapboxgl-station-location) {
		position: relative;
		background: #ffffff;
		border: 1px solid #afdbca;

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
			border-top-color: #ffffff;
			border-width: 10px;
			margin-left: -10px;
		}
		&:before {
			border-color: rgba(175, 219, 202, 0);
			border-top-color: #afdbca;
			border-width: 12px;
			margin-left: -12px;
		}
		padding: 0.1rem 0.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 0.5rem rgba(0, 0, 0, 0.25);
		:global(#shadow) {
			z-index: -2;
			position: absolute;
			width: 80%;
			height: 0.5rem;
			background: darkgreen;
			left: 10%;
			bottom: -20px;
			border-radius: 100%;
			//blur
			filter: blur(0.3rem);
		}
		:global(.mapboxgl-station-location-inner) {
			:global(> p) {
				margin: 0;
				padding: 0;
				// font-size: xx-large;
				&.name {
					//doenst work?
					font-weight: bold;
				}
				&.price {
					color: color.scale($primary, $lightness: 50%);
				}
				&:not(.price):not(.name) {
					padding: 0;
					color: color.scale($primary, $lightness: -50%);
					&::after {
						content: ' €';
					}
				}
			}
		}
	}
</style>
