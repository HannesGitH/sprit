<script lang="ts">
	export let api_key: string;

	export let rotation = 0;

	import { position, isPositionKnown } from '$lib/helpers/position';

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
	});

	$: {
		if ($isPositionKnown && userLocationMarker) {
			userLocationMarker.setLngLat([$position.lng, $position.lat]);
			map.panTo([$position.lng, $position.lat]);
			map.setCenter([$position.lng, $position.lat]);
			map.zoomTo(12);
		}
	}
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" />

<div id="positionmarker" bind:this={positionMarker} hidden={!$isPositionKnown}>
	<div class="mapboxgl-user-location-dot" />
</div>

<style lang="scss">
	@use 'sass:color';

	#map {
		width: 100%;
		height: 100%;
	}
	$user-location-color: color.scale($primary, $lightness: -50%);

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

		.mapboxgl-user-location-dot-stale {
			background-color: #aaa;
		}

		.mapboxgl-user-location-dot-stale::after {
			display: none;
		}
	}
</style>
