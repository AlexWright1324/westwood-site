import { getAboutPage } from "$lib/content"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
	return {
		page: await getAboutPage()
	}
}
