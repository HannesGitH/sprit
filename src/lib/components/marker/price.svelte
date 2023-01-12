<script lang="ts">
	export let name: string | null = null;
	export let price: number | string;

	$: priceNum = Number(price);
	$: euros = Math.floor(priceNum);
	$: cents = Math.floor((priceNum % 1) * 100);
	$: tenths = Math.floor((priceNum % 1) * 1000) % 10;
</script>

<div class="wrapper">
	{#if name}
		<p class="petrolname">{name}</p>
	{/if}
	<div class="price">
		<p class="price euros">{euros},</p>
		<p class="price cents">{cents}</p>
		<p class="price tenths">{tenths}</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: baseline;
		justify-content: space-between;
		height: 100%;

		.petrolname {
			font-size: xx-small;
			font-weight: 300;
			margin: 0;
			margin-bottom: -5px;
			padding: 0;
			// margin: 0 0 -10px 0;
			color: gray;
		}
		.price {
			$font-size: 0.8rem;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: flex-end;
			padding: 0;
			margin: 0;
			font-weight: 300;

			.euros {
				font-size: $font-size;
			}
			.cents {
				font-size: calc($font-size * 0.9);
				margin-bottom: calc($font-size * 0.05);
			}
			.tenths {
				font-size: calc($font-size * 0.7);
				margin-bottom: calc($font-size * 0.15);
				margin-left: calc($font-size * 0.005);
			}
		}
	}
</style>
