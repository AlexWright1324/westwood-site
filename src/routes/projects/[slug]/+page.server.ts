import { getEntryCollection } from "$lib/cms/content"
import { error } from "@sveltejs/kit"
import type { EntryGenerator, PageServerLoad } from "./$types"
import { htmlToText } from "$lib/markdown"

export const entries: EntryGenerator = () => {
	const projects = getEntryCollection("projects")
	return projects.map((project) => ({ slug: project.slug }))
}

export const load: PageServerLoad = async ({ params }) => {
	const projects = getEntryCollection("projects")
	const project = projects.find((p) => p.slug === params.slug)

	if (!project) {
		error(404, "Project not found")
	}

	return {
		project,
		metaDescription: project.statement ? htmlToText(project.statement) : ""
	}
}
