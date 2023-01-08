<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<slot />

<footer />

<Navbar />

<style lang="scss">
	// @import url('https://fonts.cdnfonts.com/css/ostrich-sans-2');
	@import url('https://fonts.googleapis.com/css2?family=Archivo&display=swap');
	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Archivo', 'Ostrich Sans', sans-serif;
	}
</style>
