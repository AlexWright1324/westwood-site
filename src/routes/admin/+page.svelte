<script lang="ts">
	import { browser } from "$app/environment"
	import CMS, { type CmsConfig } from "@sveltia/cms"
	import { onMount } from "svelte"

	const config: CmsConfig = {
		load_config_file: false,
		backend: {
			name: "github",
			repo: "AlexWright1324/westwood-site"
		},
		media_folder: "/static/uploads",
		public_folder: "/uploads",

		collections: [
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

	CMS.init({ config })
</script>
