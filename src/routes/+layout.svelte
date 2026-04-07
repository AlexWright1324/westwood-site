<script lang="ts">
	import "$lib/stylesheets/app.css"
	import favicon from "$lib/assets/favicon.svg"

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

	const links = [
		{ href: "/projects", text: "Projects" },
		{ href: "/bio", text: "Bio" }
	]
</script>

<svelte:head>
	<title>K. Westwood</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="sticky mt-8 mb-8 flex flex-col items-center gap-y-3">
		<a href="/" class="text-2xl! sm:text-5xl!">K. Westwood</a>
		<div class="flex flex-wrap justify-center gap-6">
			{#each links as { href, text }}
				<a {href} class:onpage={href === page.url.pathname}><span>{text}</span></a>
			{/each}
		</div>
	</header>

	<main class="m-2 mb-20 flex-1">
		{@render children()}
	</main>

	<footer class="flex justify-center bg-surface-100-900 p-4 text-sm">
		<p>
			&copy; {new Date().getFullYear()} K. Westwood. All rights reserved.
		</p>
	</footer>
</div>

<style lang="postcss">
	@reference "$lib/stylesheets/app.css";

	.onpage {
		@apply font-bold text-(--anchor-font-color);
	}

	header {
		a {
			@apply btn text-xl lowercase select-none;
		}

		/* Underline animation */
		div a {
			@apply relative block;
			span {
				@apply relative;
				&::after {
					content: "";
					transition:
						transform 0.3s,
						opacity 0.2s;
					transition-timing-function: ease-in-out;
					@apply absolute bottom-0 left-0 h-[0.1em] w-full origin-center scale-0 bg-(--anchor-font-color) opacity-0;
				}
			}
			&:hover span::after {
				@apply scale-100 opacity-100;
			}
		}
	}
</style>
