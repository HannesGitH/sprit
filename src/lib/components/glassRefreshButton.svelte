<script lang="ts">
	export let onClick = (): void => {};

	type Unit = '%' | 'px' | 'em' | 'vh' | 'vh' | 'rem' | 'vw' | 'vmin' | 'vmax';
	type HeightProp = `${number}${Unit}`;
	export let top: HeightProp = '1rem';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="glass-refresh-button" on:click={onClick} role="button" tabindex="0" style="--top: {top};">
	<slot />
</div>

<style lang="scss">
	@use 'sass:color';

	$transition-duration: 400ms;
	#glass-refresh-button {
		@include glass-button;
		position: fixed;
		top: var(--top);
		left: 50%;
		transform: translateX(-50%);
		border-radius: 1rem;
	}
</style>
