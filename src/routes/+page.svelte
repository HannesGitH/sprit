<script lang="ts">
	import Map from '$lib/components/map.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	// import Geolocation from "svelte-geolocation";

	let coords: [longitude: number, latitude: number];
</script>

<div id="map">
	<!-- <Geolocation getPosition bind:coords /> -->
	<Map api_key={data.mapbox_api_key} />
</div>

<style>
	#map {
		width: 100vw;
		height: 100vh;
	}
</style>
