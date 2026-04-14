<script lang="ts">
	import ImageViewer from "$lib/components/ImageViewer.svelte"

	let { data } = $props()
</script>

{#if data.project}
	<section class="flex flex-col gap-8">
		<header
			class="flex flex-col gap-4 overflow-hidden card border border-surface-200-800 bg-linear-to-br from-surface-50-950 to-surface-100-900 p-6"
		>
			<h1 class="h1">{data.project.title}</h1>
			<article>
				{@html data.project.statement}
			</article>
		</header>

		<div class="flex flex-wrap items-center gap-4">
			<h2 class="h2">Pieces</h2>
			<hr class="hr flex-1" />
			<span class="text-sm whitespace-nowrap text-surface-600-400">
				{data.project.pieces.length}
				{data.project.pieces.length === 1 ? "piece" : "pieces"}
			</span>
		</div>

		<ul class="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
			{#each data.project.pieces as piece}
				<li class="mb-6 break-inside-avoid">
					<ImageViewer
						src={piece.image}
						alt={piece.title}
						class="group overflow-hidden card border border-surface-200-800 preset-filled-surface-100-900 card-hover"
					>
						<div class="overflow-hidden">
							<img
								class="w-full transition duration-300 group-hover:scale-[1.03]"
								src={piece.image}
								alt={piece.title}
							/>
						</div>

						<div class="p-4">
							<p class="text-lg font-semibold">{piece.title}</p>
							<p class="text-sm text-surface-600-400">
								{piece.year} &middot; {piece.medium} &middot; {piece.dimensions}
							</p>
						</div>
					</ImageViewer>
				</li>
			{/each}
		</ul>
	</section>
{/if}
