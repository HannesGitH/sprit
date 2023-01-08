<script lang="ts">
	import Map from '$lib/components/map.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { start as getPosition, position } from '$lib/helpers/position';

	export let watchLocation = false;

	export let data: PageData;

	onMount(() => {
		getPosition();
	});
</script>

<div id="map">
	<Map api_key={data.mapbox_api_key} />
</div>

<style>
	#map {
		width: 100vw;
		height: 100vh;
	}
</style>
