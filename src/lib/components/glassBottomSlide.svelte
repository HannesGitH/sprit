<div id="wrapper">
	<slot />
</div>

<style lang="scss">
	#wrapper {
		@include glass($elevation: 1.5);
		position: fixed;
		bottom: 0;
		//center
		left: 50%;
		min-width: 90%;
		transform: translateX(-50%);
		overflow: hidden;
		// padding: 2rem;
		border-top-left-radius: 3rem;
		border-top-right-radius: 3rem;
		&,
		&:focus,
		&:active,
		&:hover {
			border-bottom: none;
		}
	}
</style>
