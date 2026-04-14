<script lang="ts">
	import "$lib/stylesheets/app.css"
	import favicon from "$lib/assets/favicon.svg"
	import Header from "$lib/components/layout/Header.svelte"
	import Footer from "$lib/components/layout/Footer.svelte"
	import BackgroundImage from "$lib/assets/background.jpeg"
	import { page } from "$app/state"

	import { onNavigate } from "$app/navigation"

	let { children } = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>K. Westwood</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col items-center">
	<Header
		class={page.url.pathname === "/" ? "flex-1 bg-cover bg-no-repeat" : ""}
		style={page.url.pathname === "/" ? `background-image: url("${BackgroundImage}")` : ""}
		boxClass={page.url.pathname === "/" ? "bg-black/20 p-6 rounded-2xl" : ""}
	/>

	{#if page.url.pathname !== "/"}
		<hr class="hr w-[90%] self-center" />

		<main class="m-6 mb-20 w-full max-w-4xl flex-1">
			{@render children()}
		</main>
	{/if}

	<Footer />
</div>
