<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
</script>

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
