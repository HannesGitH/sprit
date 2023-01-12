<script lang="ts">
	export let selected = false;
	export let onClick: (() => void | Promise<void>) | null = null;
</script>

<button
	class="tag"
	class:selected
	on:click={onClick ??
		(() => {
			selected = !selected;
		})}
>
	<slot />
</button>

<style lang="scss">
	.tag {
		@include glass-button;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		margin: 0.5rem;
		transition: all 0.2s ease-in-out;
		&:hover {
			transform: scale(1.1);
		}
		&.selected {
			border: 1px solid $primary;
		}
	}
</style>
