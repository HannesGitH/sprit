<script lang="ts">
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';
	import mapboxgl from 'mapbox-gl';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		mapboxgl.accessToken = data.mapbox_api_key;
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
	});
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css" rel="stylesheet" />
</svelte:head>

<div id="map" />
