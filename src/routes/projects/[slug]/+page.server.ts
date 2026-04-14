import { getProjectBySlug, getProjects } from "$lib/content"
import type { EntryGenerator, PageServerLoad } from "./$types"

export const entries: EntryGenerator = async () => {
	const projects = await getProjects()
	return projects.map((project) => ({ slug: project.slug }))
}

export const load: PageServerLoad = async ({ params }) => {
	return {
		project: await getProjectBySlug(params.slug)
	}
}
