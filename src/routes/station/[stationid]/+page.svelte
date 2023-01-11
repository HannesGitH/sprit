<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import Station from '$lib/components/station.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: station = data.station;
</script>

<section id="page">
	<Card>
		<Station {station} />
	</Card>
</section>

<style>
	#page {
		/**align in center, both horizontally and vertically*/
		transform: translate(-50%, -50%) scale(2);
		position: absolute;
		top: 50%;
		left: 50%;
	}
</style>
