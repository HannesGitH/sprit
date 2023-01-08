<script lang="ts">
	import Map from '$lib/components/map.svelte';
	import GlassSideButton from '$lib/components/glassSideButton.svelte';
	import GlassBottomSlide from '$lib/components/glassBottomSlide.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	// import { start as getPosition, position } from '$lib/helpers/position';
	import { isPositionKnown, toggle as togglePosition } from '$lib/helpers/position';
	import { nearbyStations } from '$lib/helpers/stores';

	export let data: PageData;

	// onMount(() => {
	// 	getPosition();
	// });

	let rotation = 0;
	let setRotation: (value: number) => void;
</script>

<div id="map">
	<Map api_key={data.mapbox_api_key} bind:rotation bind:setRotation />
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

<GlassSideButton
	side="right"
	top="5rem"
	onClick={() => {
		setRotation(0);
	}}
>
	<div id="compass">
		<span class="material-symbols-outlined" style="--direction: {-rotation}deg;"> north </span>
	</div>
</GlassSideButton>

<GlassBottomSlide>
	<div class="content">
		<h1>Map</h1>
		<p>This is a map. It shows you where you are and where you can go. You can also rotate it.</p>
		{#if $nearbyStations && $nearbyStations.length > 0}
			<h2>Nearby Stations</h2>
			<ul>
				{#each $nearbyStations as station}
					<li>
						<a href="/station/{station.id}">{station.name}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</GlassBottomSlide>

<style lang="scss">
	#map {
		width: 100vw;
		height: 100vh;
	}
	#location-activate-button,
	#compass {
		width: 3rem;
		height: 3rem;
		position: relative;
		color: gray;
		> * {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	#compass {
		> * {
			// rotate: var(--direction);
			transform: translate(-50%, -50%) rotate(var(--direction));
		}
		color: $primary-darker;
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48;
		&.active {
			font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;
			color: $primary-darker;
		}
	}
</style>
