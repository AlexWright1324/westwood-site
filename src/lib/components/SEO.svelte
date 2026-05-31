<script lang="ts" module>
	interface SEOPageData {
		title?: string
		description?: string
		image?: string
		site_name?: string
		type?: string
	}
</script>

<script lang="ts">
	import { page } from "$app/state"

	const { seo: defaults }: { seo: SEOPageData } = $props()

	const seo: SEOPageData = $derived({ ...defaults, ...page.data.seo })
</script>

<svelte:head>
	{#if seo.title}
		<title>{seo.title}</title>
		<meta property="og:title" content={seo.title} />
	{/if}

	{#if seo.description}
		<meta name="description" content={seo.description} />
		<meta property="og:description" content={seo.description} />
	{/if}

	{#if seo.image}
		<meta property="og:image" content={seo.image} />
	{/if}

	{#if seo.type}
		<meta property="og:type" content={seo.type} />
	{/if}

	{#if seo.site_name}
		<meta property="og:site_name" content={seo.site_name} />
	{/if}

	<meta property="og:url" content={page.url.href} />
</svelte:head>
