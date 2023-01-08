<script lang="ts">
	export let onClick = (): void => {};
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
		@include button-destyle;
		position: fixed;
		top: var(--top);
		@if var(--side) == 'left' {
			left: 0;
			border-top-right-radius: 1rem;
			border-bottom-right-radius: 1rem;
		} @else {
			right: 0;
			border-top-left-radius: 1rem;
			border-bottom-left-radius: 1rem;
		}

		@include glass($elevation: 1.5);
		transition: all 0.1s ease-in-out;
		&:hover {
			@include glass($elevation: 2.2);
			border: none;
			transform: scale(1.01);
		}
		&:active {
			@include glass($elevation: 2.8);
			border: none;
			transform: scale(1.02);
		}

		cursor: pointer;
		// border: 1px solid rgba($color: #FFF, $alpha: .4);
	}
</style>
