<script lang="ts">
	import { sanitise } from "$lib/sanitise"

	let { data } = $props()
	const content = $derived(await sanitise(data.page.content))
</script>

<section class="flex flex-col gap-6">
	<h1 class="h1">{data.page.title}</h1>
	<article class="markdown">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</article>
</section>
