<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: station = data.station;
	$: console.log(station);
</script>

<h1>{station.name}</h1>

<style>
	/* center h1 horizontally and vertically*/
	h1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
