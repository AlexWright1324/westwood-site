<script lang="ts">
	import { resolve } from "$app/paths"
</script>

<footer class="flex w-full flex-col items-center bg-surface-100-900 p-4 text-sm">
	<p>
		&copy; {new Date().getFullYear()}
		<a href={resolve("/admin")}>Kasie Westwood</a>. All rights reserved.
	</p>
</footer>
