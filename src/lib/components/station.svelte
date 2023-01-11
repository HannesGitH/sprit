<script lang="ts">
	import type {
		DetailedStation,
		MultiplePriceStation,
		SinglePriceStation,
		Station
	} from '$lib/helpers/tankerkoenig.server';

	export let station: Station | DetailedStation;
	$: dist = station.dist; //TODO: better dist in minutes

	$: isDetailed = (station as DetailedStation).wholeDay;
	$: products = (station as SinglePriceStation).price
		? [{ name: 'price', price: (station as SinglePriceStation).price }]
		: ((s: MultiplePriceStation) => [
				{ name: 'Diesel', price: s.diesel },
				{ name: 'e5', price: s.e5 },
				{ name: 'e10', price: s.e10 }
		  ])(station as MultiplePriceStation);
	//TODO: add icons
</script>

<div>
	<div id="top-row">
		<div id="name-wrapper">
			<h2 id="name">{station.name}</h2>
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
			<p>hi</p>
		{/each}
	</div>
</div>

<style>
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
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	#distance p {
		padding-left: 1rem;
		margin: 0;
	}
	#distance p::after {
		font-size: 0.5rem;
		font-weight: 300;
		content: ' km';
	}

	.prices {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
