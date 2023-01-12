<script lang="ts">
	import type {
		DetailedStation,
		MultiplePriceStation,
		SinglePriceStation,
		Station
	} from '$lib/helpers/tankerkoenig.server';
	import Price from './marker/price.svelte';

	export let station: Station | DetailedStation;
	$: dist = station.dist; //TODO: better dist in minutes

	$: isDetailed = (station as DetailedStation).wholeDay != null;
	$: products = (station as SinglePriceStation).price
		? [{ name: 'price', price: (station as SinglePriceStation).price }]
		: ((s: MultiplePriceStation) => [
				{ name: 'diesel', price: s.diesel },
				{ name: 'e5', price: s.e5 },
				{ name: 'e10', price: s.e10 }
		  ])(station as MultiplePriceStation);

	$: detailedStation = station as DetailedStation;

	import { sortBy } from '$lib/helpers/stores';
	//TODO: add icons
</script>

<div class="card">
	<div id="top-row">
		<div id="name-wrapper">
			<h3 id="name">{station.name}</h3>
			<h6 id="brand">{station.brand}</h6>
		</div>
		{#if dist}
			<div id="distance">
				<p>{dist}</p>
			</div>
		{/if}
	</div>
	<div class="prices">
		{#each products as product}
			<div class="price" class:selected={$sortBy == product.name}>
				<Price name={product.name} price={product.price} />
			</div>
		{/each}
	</div>
	<!-- TODO: add details, and start navigation button -->
	<!-- {#if isDetailed}
		{@const station = detailedStation}
		{#if station.wholeDay}
			<div class="whole-day">
				<p>24h geöffnet</p>
			</div>
		{/if}
	{/if} -->
</div>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* justify-self: stretch; */
		height: 100%;
		/* align-items: stretch; */
	}
	#top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: top;
	}

	#name-wrapper {
		display: flex;
		flex-direction: column;
		align-items: baseline;
	}

	#name {
		margin: 0;
		text-align: left;
	}

	#brand {
		margin: 0;
	}

	#distance {
		position: absolute;
		right: 1rem;
		top: 1rem;
		p {
			padding-left: 1rem;
			margin: 0;
			&::after {
				font-size: 0.5rem;
				font-weight: 300;
				content: ' km';
			}
		}
	}

	.prices {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.price {
			padding-top: 0.8rem;
			height: 1.8rem;
			width: max-content;
			&.selected {
				color: $primary;
				scale: 1.2;
			}
		}
	}
</style>
