<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"
	import { config } from "$lib/cms/config"

	onMount(async () => {
		if (!browser) return
		const { init } = await import("@sveltia/cms")
		init({ config })
	})
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
