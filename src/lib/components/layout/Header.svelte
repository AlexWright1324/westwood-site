<script lang="ts">
	import { page } from "$app/state"
	import { resolve } from "$app/paths"
	import type { ClassValue } from "svelte/elements"

	const links = [
		{ href: "/projects", text: "Projects" },
		{ href: "/about", text: "About" },
		{ href: "/contact", text: "Contact & CV" }
	] as const

	let {
		class: _class,
		boxClass,
		style: _style
	}: {
		class?: ClassValue
		boxClass?: ClassValue
		style?: string
	} = $props()
</script>

<header class={["flex items-center justify-center pt-8 pb-8", _class]} style={_style}>
	<div class={["flex flex-col gap-y-3", boxClass]}>
		<a href={resolve("/")} class="text-2xl! sm:text-5xl!">Kasie Westwood</a>
		<div class="flex flex-wrap justify-center gap-6">
			{#each links as { href, text }}
				<a href={resolve(href)} class="hoverunderline" class:onpage={href === page.url.pathname}>
					<span>{text}</span>
				</a>
			{/each}
		</div>
	</div>
</header>

<style lang="postcss">
	@reference "$lib/stylesheets/app.css";

	.onpage {
		@apply font-bold text-(--anchor-font-color);
	}

	a {
		@apply btn text-xl select-none;
	}

	/* Underline animation */
	.hoverunderline {
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
</style>
