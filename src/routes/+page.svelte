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
	<div class="content masked-overflow">
		{#if $nearbyStations && $nearbyStations.length > 0}
			<h2 style="padding: 2rem 2rem 0 2rem">Tankstellen in der Nähe</h2>
			<div id="stations">
				{#each $nearbyStations as station}
					<div class="station">
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
	</div>
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
	.content {
		max-height: 70vh;
		overflow-y: scroll;
		#stations {
			display: flexbox;
			flex-flow: row wrap;
			padding: 1rem;
			.station {
			}
		}
	}
	// 	.masked-overflow {
	// 		/* scroll bar width, for use in mask calculations */
	// 		--scrollbar-width: 8px;

	// 		/* mask fade distance, for use in mask calculations */
	// 		--mask-height: 32px;

	// 		/* If content exceeds height of container, overflow! */
	// 		overflow-y: auto;

	// 		/* Our height limit */
	// 		height: 300px;

	// 		/* Need to make sure container has bottom space,
	//   otherwise content at the bottom is always faded out */
	// 		padding-bottom: var(--mask-height);

	// 		/* Keep some space between content and scrollbar */
	// 		padding-right: 20px;

	// 		/* The CSS mask */

	// 		/* The content mask is a linear gradient from top to bottom */
	// 		--mask-image-content: linear-gradient(
	// 			to bottom,
	// 			transparent,
	// 			black var(--mask-height),
	// 			black calc(100% - var(--mask-height)),
	// 			transparent
	// 		);

	// 		/* Here we scale the content gradient to the width of the container
	//   minus the scrollbar width. The height is the full container height */
	// 		--mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

	// 		/* The scrollbar mask is a black pixel */
	// 		--mask-image-scrollbar: linear-gradient(black, black);

	// 		/* The width of our black pixel is the width of the scrollbar.
	//   The height is the full container height */
	// 		--mask-size-scrollbar: var(--scrollbar-width) 100%;

	// 		/* Apply the mask image and mask size variables */
	// 		mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
	// 		mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

	// 		/* Position the content gradient in the top left, and the
	//   scroll gradient in the top right */
	// 		mask-position: 0 0, 100% 0;

	// 		/* We don't repeat our mask images */
	// 		mask-repeat: no-repeat, no-repeat;

	// 		scrollbar-width: thin; /* can also be normal, or none, to not render scrollbar */
	// 		scrollbar-color: currentColor transparent;

	// 		/* Webkit / Blink */
	// 		&::-webkit-scrollbar {
	// 			width: var(--scrollbar-width);
	// 		}

	// 		&::-webkit-scrollbar-thumb {
	// 			background-color: currentColor;
	// 			border-radius: 9999px; /* always round */
	// 		}

	// 		&::-webkit-scrollbar-track {
	// 			background-color: transparent;
	// 		}
	// }
</style>
