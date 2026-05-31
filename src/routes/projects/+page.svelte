<script lang="ts">
	import { resolve } from "$app/paths"

	let { data } = $props()
</script>

<ul class="flex flex-col gap-4">
	{#each data.projects as project (project.slug)}
		<li>
			<a
				class="flex w-full flex-col gap-2 card border border-surface-200-800 bg-linear-to-br from-surface-50-950 to-surface-100-900 pt-4 pb-4 card-hover"
				href={resolve(`/projects/${project.slug}`)}
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
