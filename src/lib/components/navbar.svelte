<script lang="ts">
	let open = false;
	let onClick = (): void => {
		open = !open;
	};
	let ariaLabel = 'toggle menu';
	let width: string | number = 40;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="burger-menu"
	on:click={onClick}
	aria-expanded={open}
	aria-label={ariaLabel}
	role="button"
	tabindex="0"
>
	<svg
		class:open
		viewBox="0 0 100 100"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-width="5"
		{width}
	>
		<path
			class="top"
			d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
		/>
		<path class="middle" d="m 30,50 h 40" />
		<path
			class="bottom"
			d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
		/>
	</svg>
</div>

<style lang="scss">
	@use 'sass:color';

	$transition-duration: 400ms;
	#burger-menu {
		position: fixed;
		top: 1rem;
		left: 0;
		width: 3rem;
		height: 3rem;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
		@include glass($elevation: 1);
		transition: all 0.1s ease-in-out;
		&:hover {
			@include glass($elevation: 2);
			border: none;
			transform: scale(1.01);
		}
		&:active {
			@include glass($elevation: 2.5);
			border: none;
			transform: scale(1.02);
		}

		@include button-destyle;
		cursor: pointer;
		display: flex;
		align-items: center;
		overflow: hidden;
		svg {
			color: color.scale($primary, $lightness: -50%);
			transition: transform $transition-duration;
		}
		.top {
			stroke-dasharray: 40 160;
			transition: stroke-dashoffset $transition-duration;
		}
		.middle {
			transform-origin: 50%;
			transition: transform $transition-duration;
		}
		.bottom {
			stroke-dasharray: 40 85;
			transition: stroke-dashoffset $transition-duration;
		}
		.open {
			transform: rotate(45deg);
			.top,
			.bottom {
				stroke-dashoffset: -64px;
			}
			.middle {
				transform: rotate(90deg);
			}
		}
	}
</style>
