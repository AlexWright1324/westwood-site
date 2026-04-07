<script lang="ts">
	import { page } from "$app/state"
</script>

{#if page.error}
	<div class="flex flex-col items-center">
		<h1 class="h1 text-error-500">{page.status}</h1>
		<p class="text-lg">{page.error.message}</p>
	</div>
{/if}
