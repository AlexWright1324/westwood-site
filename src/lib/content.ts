import matter from "gray-matter"
import { generateMarkdown } from "$lib/markdown"

type Piece = {
	title: string
	year: number
	medium: string
	dimensions: string
	image: string
}

type Project = {
	slug: string
	title: string
	statement: string
	pieces: Piece[]
}

type ContentPage = {
	title: string
	content: string
}

const projectFiles = import.meta.glob("/content/projects/*.md", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>

const pageFiles = import.meta.glob("/content/pages/*.md", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>

export const getProjects = async () => {
	const projects = Object.entries(projectFiles).map(async ([path, content]) => {
		const { data } = matter(content)

		const project: Project = {
			slug: path.split("/").pop()!.replace(/\.md$/, ""),
			title: data.title,
			statement: await generateMarkdown(data.statement),
			pieces: data.pieces.map((piece: any) => ({
				title: piece.title,
				year: piece.year,
				medium: piece.medium,
				dimensions: piece.dimensions,
				image: piece.image
			}))
		}

		return project
	})

	return Promise.all(projects)
}

export const getProjectBySlug = async (slug: string) => {
	const projects = await getProjects()
	return projects.find((project) => project.slug === slug)
}

const getPageByFileName = async (fileName: string): Promise<ContentPage | null> => {
	const key = Object.keys(pageFiles).find((path) => path.endsWith(`/${fileName}.md`))

	if (!key) {
		return null
	}

	const { data } = matter(pageFiles[key])

	return {
		title: data.title,
		content: await generateMarkdown(data.content)
	}
}

export const getAboutPage = async () => getPageByFileName("about")

export const getContactCvPage = async () => getPageByFileName("contact-cv")
