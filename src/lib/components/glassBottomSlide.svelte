<div id="wrapper">
	<slot />
</div>

<style lang="scss">
	#wrapper {
		@include glass($elevation: 3);
		position: fixed;
		bottom: 0;
		//center
		left: 50%;
		min-width: 90%;
		transform: translateX(-50%);
		padding: 2rem;
		border-top-left-radius: 3rem;
		border-top-right-radius: 3rem;
		border: 1px solid rgba($color: #fff, $alpha: 0.4);
	}
</style>
