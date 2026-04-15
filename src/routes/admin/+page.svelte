<script lang="ts">
	import { browser } from "$app/environment"
	import type { CmsConfig } from "@sveltia/cms"
	import { onMount } from "svelte"

	const config: CmsConfig = {
		load_config_file: false,
		site_url: "https://kasiewestwood.co.uk",
		backend: {
			name: "github",
			repo: "AlexWright1324/westwood-site"
		},
		media_folder: "/static/uploads",
		public_folder: "/uploads",

		collections: [
			{
				name: "pages",
				label: "Pages",
				files: [
					{
						name: "about",
						label: "About",
						file: "/content/pages/about.md",
						fields: [
							{ name: "title", label: "Title", widget: "string" },
							{ name: "content", label: "Content", widget: "markdown" }
						]
					},
					{
						name: "contactCv",
						label: "Contact & CV",
						file: "/content/pages/contact-cv.md",
						fields: [
							{ name: "title", label: "Title", widget: "string" },
							{ name: "content", label: "Content", widget: "markdown" }
						]
					}
				]
			},
			{
				name: "projects",
				label: "Projects",
				label_singular: "Project",
				folder: "/content/projects",
				fields: [
					{ name: "title", label: "Title", widget: "string" },
					{ name: "statement", label: "Project Statement", widget: "markdown" },
					{
						name: "pieces",
						label: "Pieces",
						widget: "list",
						fields: [
							{ name: "title", label: "Title", widget: "string" },
							{ name: "year", label: "Year", widget: "datetime", format: "YYYY" },
							{ name: "medium", label: "Medium", widget: "string" },
							{ name: "dimensions", label: "Dimensions", widget: "string" },
							{ name: "image", label: "Image", widget: "image" }
						]
					}
				]
			}
		]
	}

	onMount(async () => {
		if (!browser) return
		const { init } = await import("@sveltia/cms")
		init({ config })
	})
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
