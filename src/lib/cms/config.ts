import type { CmsConfig } from "@sveltia/cms"

export const config = {
	load_config_file: false,
	site_url: "https://kasiewestwood.co.uk",
	backend: {
		name: "github",
		repo: "AlexWright1324/westwood-site"
	},
	media_folder: "/src/lib/assets/uploads",
	public_folder: "/src/lib/assets/uploads",

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
} as const satisfies CmsConfig
