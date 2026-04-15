import { getContactCvPage } from "$lib/content"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	const page = await getContactCvPage()

	if (!page) {
		error(404, "Page not found")
	}

	return {
		page
	}
}
