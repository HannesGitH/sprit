<script lang="ts">
	import { fly } from 'svelte/transition';
	let open = false;
	let onClick = (): void => {
		open = !open;
	};
	let ariaLabel = 'toggle menu';
	let width: string | number = '3rem';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="burger-menu"
	on:click={onClick}
	aria-expanded={open}
	aria-label={ariaLabel}
	role="button"
	tabindex="0"
	style="
	width: {open ? 10 : 3}rem;
	height: {open ? 6 * 3 : 3}rem;
	"
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
	{#if open}
		<div id="menu" transition:fly={{ x: -200, duration: 100 }}>
			<a href="/">home</a>
			<a href="/settings">settings</a>
			<a href="/info">info</a>
		</div>
	{/if}
</div>

<style lang="scss">
	@use 'sass:color';

	$transition-duration: 400ms;
	#burger-menu {
		@include button-destyle;
		position: fixed;
		top: 1rem;
		left: 0;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
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

		#menu {
			a {
				transition: all 0.1s ease-in-out;
				margin: 0.5rem 2rem 0 0;
				padding: 1rem;
				background-color: $primary;
				top: 1rem;
				left: 0;
				border-top-right-radius: 1rem;
				border-bottom-right-radius: 1rem;
				display: block;
				display: block;
				color: black;
				text-decoration: none;
				font-weight: bold;
				&:hover {
					margin: 0.5rem 1rem 0 0;
				}
			}
		}
	}
</style>
