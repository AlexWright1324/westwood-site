<script lang="ts">
	import { enhance } from "$app/forms"
	import { resolve } from "$app/paths"
	import { FileIcon, FolderIcon, XIcon } from "@lucide/svelte"
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte"
	import { onMount } from "svelte"

	import Uppy from "@uppy/core"
	import DropTarget from "@uppy/drop-target"
	import StatusBar from "@uppy/svelte/status-bar"
	import Tus from "@uppy/tus"

	import "@uppy/core/css/style.min.css"
	import "@uppy/drop-target/css/style.min.css"

	let { data } = $props()

	const path = $derived(data.path.split("/").filter(Boolean))

	const uppy = new Uppy().use(Tus, {
		endpoint: `/api/upload?path=${encodeURIComponent(data.path)}`
	})

	$effect(() => {
		uppy.getPlugin("Tus")?.setOptions({
			endpoint: `/api/upload?path=${encodeURIComponent(data.path)}`
		})
	})

	onMount(() => {
		uppy.use(DropTarget, {
			target: document.body
		})
	})
</script>

<StatusBar {uppy} />

<div class="flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Files</h1>

	<div class="flex w-full flex-wrap items-center">
		<!-- Path Selector -->
		<div class="flex flex-wrap items-center gap-2">
			<a href={resolve("/files")} class="btn preset-filled px-3 py-1 text-sm">Home</a>
			{#each path as segment, index}
				<a
					href={resolve(`/files/${path.slice(0, index + 1).join("/")}`)}
					class="btn preset-filled px-3 py-1 text-sm"
				>
					{segment}
				</a>
			{/each}
		</div>

		<!-- Actions -->
		<div class="flex flex-1 flex-wrap items-center justify-end gap-2">
			<Dialog>
				<Dialog.Trigger class="btn preset-tonal-primary">New Folder</Dialog.Trigger>
				<Portal>
					<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
					<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
						<Dialog.Content
							class="w-full max-w-xl translate-y-25 space-y-4 card bg-surface-100-900 p-4 opacity-0 shadow-xl transition transition-discrete data-[state=open]:translate-y-0 data-[state=open]:opacity-100 starting:data-[state=open]:translate-y-25 starting:data-[state=open]:opacity-0"
						>
							<header class="flex items-center justify-between">
								<Dialog.Title class="text-lg font-bold">New Folder</Dialog.Title>
								<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
									<XIcon />
								</Dialog.CloseTrigger>
							</header>
							<Dialog.Description>
								<form use:enhance action="?/newFolder" method="post" id="newFolderForm">
									<input
										class="input"
										type="text"
										name="folderName"
										placeholder="Folder name"
										required
									/>
								</form>
							</Dialog.Description>
							<footer class="flex justify-end gap-2">
								<Dialog.CloseTrigger class="btn preset-tonal">Cancel</Dialog.CloseTrigger>
								<button type="submit" class="btn preset-filled" form="newFolderForm">Save</button>
							</footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog>
		</div>
	</div>

	<!-- File List -->
	{#await data.streamed.files}
		<span>Loading...</span>
	{:then files}
		<ul class="flex flex-col gap-2">
			{#each files as file}
				<li>
					{#if file.type === "folder"}
						<a
							href={resolve(`/files/${file.name}`)}
							class="btn flex items-center justify-start gap-3 preset-filled-surface-100-900"
						>
							<span><FolderIcon /></span>
							<span>{file.name}</span>
						</a>
					{:else}
						<div class="btn flex items-center justify-start gap-3">
							<FileIcon />
							{file.name}
						</div>
					{/if}
				</li>
			{:else}
				<li class="text-error-700-300">No files found.</li>
			{/each}
		</ul>
	{:catch error}
		<span class="text-error-500">Error loading files: {error.message}</span>
	{/await}
</div>
