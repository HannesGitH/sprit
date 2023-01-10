<script lang="ts">
	export let name: string;
	export let price: number | string;

	$: priceNum = Number(price);
	$: euros = priceNum.toFixed(0);
	$: cents = (priceNum % 1).toFixed(2).slice(2);
	$: tenths = (priceNum % 1).toFixed(3).slice(2, 3);
</script>

<div class="wrapper">
	<p class="petrolname">{name}</p>
	<div class="price">
		<p class="price euros">{euros},</p>
		<p class="price cents">{cents}</p>
		<p class="price tenths">{tenths}</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;

		.petrolname {
			font-size: xx-small;
			font-weight: 300;
			margin-bottom: 0;
			padding: 0;
			margin: 0 0 -10px 0;
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
