<script lang="ts">
	import { XIcon } from "@lucide/svelte"
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte"
	import type { Picture } from "@sveltejs/enhanced-img"
	import type { Snippet } from "svelte"
	import type { ClassValue } from "svelte/elements"

	let {
		src,
		alt,
		children,
		class: _class
	}: { src: string | Picture; alt: string; children: Snippet; class: ClassValue } = $props()
</script>

<Dialog>
	<Dialog.Trigger class={_class}>
		{@render children()}
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/80" />
		<Dialog.Positioner class="fixed inset-0 z-50 m-4 flex items-center justify-center p-4">
			<Dialog.Content class="relative overflow-hidden bg-surface-50-950 shadow-2xl">
				<enhanced:img
					class="block h-auto w-auto object-contain"
					style="max-width: calc(100vw - 4rem); max-height: calc(100vh - 4rem);"
					{src}
					{alt}
				/>
				<Dialog.CloseTrigger class="fixed top-4 right-4 z-60 btn-icon block">
					<XIcon size={32} />
				</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
