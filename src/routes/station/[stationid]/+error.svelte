<script>
	import { page } from '$app/stores';
</script>

<div class="centered">
	{#if $page?.error}
		{#if $page?.status === 404}
			<h1>Diese Tankstelle kommt mir leider momentan nicht bekannt vor...</h1>
			<p>Überprüfe deine Verbindung oder probier eine andere Tanke..</p>
		{:else if $page?.error?.message}
			<p>Error message: {$page?.error?.message}</p>
		{/if}
	{/if}
</div>

<style>
	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
