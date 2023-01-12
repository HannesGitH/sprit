<script lang="ts">
	import Tag from './tag.svelte';

	export let radio = false;

	export let possibilities: { name: string; selected: boolean }[] = [];

	function select(index: number) {
		if (radio) {
			possibilities.forEach((p, i) => (i != index ? (p.selected = false) : null));
		}
		possibilities[index].selected = !possibilities[index].selected;
	}
</script>

<div class="tags">
	{#each possibilities as possibility, index}
		<Tag
			bind:selected={possibility.selected}
			onClick={() => {
				select(index);
			}}>{possibility.name}</Tag
		>
	{/each}
</div>

<style lang="scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: 1rem;
	}
</style>
