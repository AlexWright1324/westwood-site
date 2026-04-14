<script lang="ts">
	let { data } = $props()
</script>

<h1 class="h1">Projects</h1>

{#each data.projects as project}
	{project.title}
	{@html project.statement}
{/each}
