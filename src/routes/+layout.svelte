<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
</script>

<slot />

<footer />

<Navbar />

<style lang="scss">
	@import url('https://fonts.cdnfonts.com/css/ostrich-sans-2');
	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Ostrich Sans', sans-serif;
	}
</style>
