<script lang="ts">
	import Map from '$lib/components/map.svelte';
	import GlassSideButton from '$lib/components/glassSideButton.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { start as getPosition, position } from '$lib/helpers/position';
	import { isPositionKnown, toggle as togglePosition } from '$lib/helpers/position';

	export let watchLocation = false;

	export let data: PageData;

	onMount(() => {
		getPosition();
	});

	let rotation = 0;
</script>

<div id="map">
	<Map api_key={data.mapbox_api_key} bind:rotation />
</div>

<GlassSideButton
	side="right"
	onClick={() => {
		togglePosition();
	}}
>
	<div id="location-activate-button">
		<span class="material-symbols-outlined" class:active={$isPositionKnown}> my_location </span>
	</div>
</GlassSideButton>

<style lang="scss">
	#map {
		width: 100vw;
		height: 100vh;
	}
	#location-activate-button {
		width: 3rem;
		height: 3rem;
		position: relative;
		> * {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48;
		color: gray;
		&.active {
			font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;
			color: $primary-darker;
		}
	}
</style>
