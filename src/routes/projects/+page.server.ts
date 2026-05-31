import { getEntryCollection } from "$lib/cms/content"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	return {
		seo: {
			title: "Projects - Kasie Westwood",
			description: "Art Portfolio Projects"
		},
		projects: getEntryCollection("projects")
	}
}
