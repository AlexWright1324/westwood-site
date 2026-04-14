<script lang="ts">
	import { resolve } from "$app/paths"
	import type { Session } from "@auth/sveltekit"
	import { LogOutIcon, ShieldUserIcon, FolderIcon } from "@lucide/svelte"

	let { session }: { session: Session | null } = $props()
</script>

<footer class="flex flex-col items-center bg-surface-100-900 p-4 text-sm">
	{#if session}
		<div class="flex flex-wrap items-center gap-4">
			<p>
				Hello <strong>{session.user?.name}</strong>!
			</p>
			<div class="flex flex-wrap gap-2">
				<a class="btn-icon" href={resolve("/admin")}>
					<ShieldUserIcon />
				</a>
				<a class="btn-icon" href="/files">
					<FolderIcon />
				</a>
				<a class="btn-icon" href="/auth/signout">
					<LogOutIcon />
				</a>
			</div>
		</div>
	{/if}
	<p>
		&copy; {new Date().getFullYear()}
		<a href="/auth/signin" class="hover:underline">K. Westwood.</a>
		All rights reserved.
	</p>
</footer>
