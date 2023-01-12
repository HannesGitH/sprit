<script lang="ts">
	import { tweened, spring } from 'svelte/motion';
	import { bounceInOut as easing } from 'svelte/easing';
	// const compression = tweened(0, {
	// 	duration: 100,
	// 	easing: easing
	// });

	export const values = {
		set compressed(newVal: boolean) {
			this._isCompressed = newVal;
			compression.set(newVal ? 1 : 0);
		},
		get compressed() {
			return this._isCompressed;
		},
		_isCompressed: false
	};
	const compression = spring(0, {
		stiffness: 0.1,
		damping: 0.5
	});
	let lastY: number | null = null;
	function getDragDeltaY(event: MouseEvent | TouchEvent): number {
		if (event instanceof MouseEvent) {
			return event.movementY;
		} else if (event instanceof TouchEvent) {
			if (lastY === null) {
				lastY = event.touches[0].pageY;
				return 0;
			} else {
				const delta = event.touches[0].pageY - lastY;
				lastY = event.touches[0].pageY;
				return -delta;
			}
		}
		//should be unreachable
		return 0;
	}

	const onTouchStart = (evt: TouchEvent) => {
		lastY = evt.touches[0].pageY;
	};
	const onTouchEnd = (evt: TouchEvent) => {
		lastY = null;
	};

	const onScroll = (scrollEvent: Event) => {
		const margin = 0;
		if (scrollEvent instanceof WheelEvent || scrollEvent instanceof TouchEvent) {
			const dragDelta = getDragDeltaY(scrollEvent as TouchEvent);
			// console.log(getDragDeltaY(scrollEvent as TouchEvent), (scrollEvent as WheelEvent).deltaY);
			if (
				(scrollEvent as WheelEvent).deltaY < -margin ||
				(dragDelta < -margin / 10 && wrapper.scrollTop <= 0)
			) {
				values.compressed = true;
			} else if ((scrollEvent as WheelEvent).deltaY > margin || dragDelta > margin / 10) {
				values.compressed = false;
			}
		}
	};
	let wrapper: HTMLElement;
</script>

<div
	id="wrapper"
	style="--compression: {$compression};"
	on:wheel={onScroll}
	on:touchmove={onScroll}
	on:touchstart={onTouchStart}
	on:touchend={onTouchEnd}
>
	<div class="content masked-overflow" bind:this={wrapper}>
		<slot />
	</div>
</div>

<!-- TODO: make vertically resizable with a custom dragbar on top, also automatically hide popup on scroll -->
<style lang="scss">
	#wrapper {
		@include glass($elevation: 1.5);
		position: fixed;
		bottom: 0;
		//center
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		overflow: hidden;
		// padding: 2rem;
		@media not screen and not (orientation: portrait) {
			border-top-left-radius: 3rem;
			border-top-right-radius: 3rem;
		}
		&,
		&:focus,
		&:active,
		&:hover {
			border-bottom: none;
		}
		.content {
			$comp: var(--compression);
			$height: calc((70vh * (1 - $comp)) + (10vh * $comp));
			max-height: $height;
			overflow-y: scroll;
		}
		.masked-overflow {
			/* scroll bar width, for use in mask calculations */
			--scrollbar-width: 8px;

			/* mask fade distance, for use in mask calculations */
			--mask-height: 32px;

			/* If content exceeds height of container, overflow! */
			overflow-y: auto;

			/* Our height limit */
			// height: 300px;

			/* Need to make sure container has bottom space,
	  otherwise content at the bottom is always faded out */
			padding-bottom: var(--mask-height);

			/* Keep some space between content and scrollbar */
			// padding-right: 20px;

			/* The CSS mask */

			/* The content mask is a linear gradient from top to bottom */
			--mask-image-content: linear-gradient(
				to bottom,
				transparent,
				black var(--mask-height),
				black calc(100% - var(--mask-height)),
				transparent
			);

			/* Here we scale the content gradient to the width of the container
	  minus the scrollbar width. The height is the full container height */
			--mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

			/* The scrollbar mask is a black pixel */
			--mask-image-scrollbar: linear-gradient(black, black);

			/* The width of our black pixel is the width of the scrollbar.
	  The height is the full container height */
			--mask-size-scrollbar: var(--scrollbar-width) 100%;

			/* Apply the mask image and mask size variables */
			mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
			mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

			/* Position the content gradient in the top left, and the
	  scroll gradient in the top right */
			mask-position: 0 0, 100% 0;

			/* We don't repeat our mask images */
			mask-repeat: no-repeat, no-repeat;

			scrollbar-width: thin; /* can also be normal, or none, to not render scrollbar */
			scrollbar-color: currentColor transparent;

			/* Webkit / Blink */
			&::-webkit-scrollbar {
				width: var(--scrollbar-width);
			}

			&::-webkit-scrollbar-thumb {
				background-color: currentColor;
				border-radius: 9999px; /* always round */
			}

			&::-webkit-scrollbar-track {
				background-color: transparent;
			}
		}
	}
</style>
