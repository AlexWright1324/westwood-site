import { getFile } from "$lib/cms/content"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { htmlToText } from "$lib/markdown"

export const load: PageServerLoad = async () => {
	const page = getFile("pages", "about")

	if (!page) {
		error(404, "Page not found")
	}

	const description = htmlToText(page.content)

	return {
		seo: {
			title: "About - Kasie Westwood",
			description
		},
		page,
		metaDescription: description
	}
}
