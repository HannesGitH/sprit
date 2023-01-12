<script lang="ts">
	export let onClick: (() => void | Promise<void>) | null = null;
	export let important = false;
</script>

<button class="card" class:important on:click={onClick}>
	<slot />
</button>

<style lang="scss">
	.card {
		@include button-destyle;
		@include glass-button;
		// background-color: black;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 1.5rem;
		padding: 1rem;
		width: 100%;
		height: 100%;
		&.important {
			&,
			&:focus,
			&:active,
			&:hover {
				border: 1px solid $primary;
			}
		}
		// box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
		// border: 1px solid $primary;
	}
</style>
