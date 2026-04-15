<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>Projects - Kasie Westwood</title>
	<meta name="description" content="Projects by Kasie Westwood" />
</svelte:head>

<ul class="flex flex-col gap-4">
	{#each data.projects as project}
		<li>
			<a
				class="flex w-full flex-col gap-2 card border border-surface-200-800 bg-linear-to-br from-surface-50-950 to-surface-100-900 pt-4 pb-4 card-hover"
				href="/projects/{project.slug}"
			>
				<span class="overflow-hidden text-center text-2xl text-ellipsis whitespace-nowrap">
					{project.title}
				</span>
				<span class="text-center">
					{project.pieces.length}
					{project.pieces.length === 1 ? "piece" : "pieces"}
				</span>
			</a>
		</li>
	{/each}
</ul>
