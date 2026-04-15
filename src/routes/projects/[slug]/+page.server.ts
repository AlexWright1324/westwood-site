import { getProjectBySlug, getProjects } from "$lib/content"
import { error } from "@sveltejs/kit"
import type { EntryGenerator, PageServerLoad } from "./$types"

export const entries: EntryGenerator = async () => {
	const projects = await getProjects()
	return projects.map((project) => ({ slug: project.slug }))
}

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectBySlug(params.slug)

	if (!project) {
		error(404, "Project not found")
	}

	return {
		project
	}
}
