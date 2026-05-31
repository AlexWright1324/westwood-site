<script lang="ts">
	import { page } from "$app/state"
	import BackgroundImage from "$lib/assets/background.jpeg"
	import { sanitise } from "$lib/sanitise"

	let { data } = $props()
	const content = $derived(await sanitise(data.page.content))
</script>

<svelte:head>
	<title>About - Kasie Westwood</title>
	<meta name="description" content={data.metaDescription} />

	<meta property="og:title" content="About - Kasie Westwood" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={new URL(BackgroundImage, page.url.href).href} />
	<meta property="og:description" content={data.metaDescription} />
</svelte:head>

<section class="flex flex-col gap-6">
	<h1 class="h1">{data.page.title}</h1>
	<article class="markdown">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</article>
</section>
