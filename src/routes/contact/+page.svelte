<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>Contact - Kasie Westwood</title>
	<meta name="description" content={data.metaDescription} />
</svelte:head>

<section class="flex flex-col gap-6">
	<h1 class="h1">{data.page.title}</h1>
	<article>
		{@html data.page.content}
	</article>
</section>
