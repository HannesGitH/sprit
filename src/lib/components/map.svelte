<script lang="ts">
	import { onMount } from 'svelte';

	export let api_key: string;
	import mapboxgl from 'mapbox-gl';

	onMount(() => {
		mapboxgl.accessToken = api_key;
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

<style>
	#map {
		width: 100%;
		height: 100%;
	}
</style>
