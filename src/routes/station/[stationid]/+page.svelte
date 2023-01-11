<script lang="ts">
	import Station from '$lib/components/station.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: station = data.station;
</script>

<Station {station} />

<style>
</style>
