import { getEntryCollection } from "$lib/cms/content"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	return {
		projects: getEntryCollection("projects")
	}
}
