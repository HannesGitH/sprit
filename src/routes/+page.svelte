<script lang="ts">
	import Map from '$lib/components/map.svelte';
	import GlassSideButton from '$lib/components/glassSideButton.svelte';
	import GlassBottomSlide from '$lib/components/glassBottomSlide.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		isPositionKnown,
		toggle as togglePosition,
		start as getPosition,
		type PositionWithRadius
	} from '$lib/helpers/position';
	import { nearbyStations, updateNearbyStations } from '$lib/helpers/stores';
	import GlassRefreshButton from '$lib/components/glassRefreshButton.svelte';
	import Station from '$lib/components/station.svelte';
	import Card from '$lib/components/card.svelte';

	export let data: PageData;

	// onMount(() => {
	// 	getPosition();
	// });

	let center: PositionWithRadius = {
		lng: 13,
		lat: 52,
		rad: 12
	};

	let rotation = 0;
	let setRotation: (value: number) => void;
</script>

<div id="map">
	<Map api_key={data.mapbox_api_key} bind:rotation bind:setRotation bind:center />
</div>

<GlassRefreshButton
	onClick={() => {
		updateNearbyStations(center);
	}}
>
	<div id="refresh">
		<span class="material-symbols-outlined" class:active={!$isPositionKnown}> refresh </span>
		<p>hier suchen</p>
	</div>
</GlassRefreshButton>

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
	{#if $nearbyStations && $nearbyStations.length > 0}
		<h2 style="padding: 2rem 2rem 0 2rem">Tankstellen in der Nähe</h2>
		<div id="stations">
			{#each $nearbyStations as station}
				<div class="station">
					<!-- TODO: highlight on map (on hover) and vice versa (simply add a 'selected' var and set and compare) -->
					<Card onClick={() => goto(`/station/${station.id}`)}>
						<Station {station} />
					</Card>
				</div>
			{/each}
		</div>
	{:else}
		<div style="padding: 2rem">
			<h1>Sprit</h1>
			<p>
				Verschiebe den Kartenauschnitt und drücke oben auf <i>hier suchen</i> oder
				<button id="activate-location-text-button" on:click={(e) => getPosition()}
					>aktiviere den Standort</button
				>.
			</p>
		</div>
	{/if}
</GlassBottomSlide>

<style lang="scss">
	#activate-location-text-button {
		@include button-destyle;
	}
	#map {
		width: 100vw;
		height: 100vh;
	}
	#location-activate-button,
	#compass,
	#refresh {
		width: 3rem;
		height: 3rem;
		position: relative;
		color: white;
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
		color: $primary;
	}
	#refresh {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		padding: 0 1rem;
		width: fit-content;
		> * {
			position: relative;
			top: 0;
			left: 0;
			transform: none;
		}
		> span {
			font-size: 2rem;
			margin-right: 0.5rem;
		}
		> p {
			margin: 0;
			font-size: 1rem;
			line-height: 1.5rem;
		}
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 48;
		&.active {
			font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;
			color: $primary;
		}
	}

	#stations {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		grid-template-rows: 1fr max-content;
		grid-gap: 1rem;
		padding: 1rem;
		.station {
			height: 100%;
			width: 100%;
		}
	}
</style>
