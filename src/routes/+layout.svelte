<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
</script>

<Navbar />

<slot />

<footer />

<style lang="scss">
	@import url('https://fonts.cdnfonts.com/css/ostrich-sans-2');
	:global(body) {
		font-family: 'Ostrich Sans', sans-serif;
	}
</style>
