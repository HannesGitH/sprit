<script lang="ts">
	export let onClick: () => void;
	export let side: 'left' | 'right' = 'left';

	type Unit = '%' | 'px' | 'em' | 'vh' | 'vh' | 'rem' | 'vw' | 'vmin' | 'vmax';
	type HeightProp = `${number}${Unit}`;
	export let top: HeightProp = '1rem';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="glass-side-button"
	on:click={onClick}
	role="button"
	tabindex="0"
	style="--side: {side}; --top: {top};"
>
	<slot />
</div>

<style lang="scss">
	@use 'sass:color';

	$transition-duration: 400ms;
	#glass-side-button {
		@include glass-button;
		position: fixed;
		top: var(--top);
		@if var(--side) == 'left' {
			left: 0;
			border-top-right-radius: 1rem;
			border-bottom-right-radius: 1rem;
			&,
			&:focus,
			&:active,
			&:hover {
				border-left: none;
			}
		} @else {
			right: 0;
			border-top-left-radius: 1rem;
			border-bottom-left-radius: 1rem;
			&,
			&:focus,
			&:active,
			&:hover {
				border-right: none;
			}
		}
	}
</style>
