<div id="wrapper">
	<slot />
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
	}
</style>
