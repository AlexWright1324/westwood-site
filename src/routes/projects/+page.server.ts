import type { PageServerLoad } from "./$types"
import matter from "gray-matter"

export const load: PageServerLoad = async () => {
	const projectFiles = import.meta.glob("/content/projects/*.md", {
		query: "?raw",
		import: "default",
		eager: true
	})

	const projects = Object.entries(projectFiles).map(([path, content]) => {
		const { data } = matter(content as string)

		return {
			title: data.title,
			statement: Bun.markdown.render(data.statement, {
				heading: (children, { level }) => `<h${level} class="h${level}">${children}</h${level}>`,
				paragraph: (children) => `<p class="p">${children}</p>`,
				list: (children, { ordered }) => `<ul class="ul">${children}</ul>`,
				listItem: (children) => `<li class="li">${children}</li>`,
				link: (children, { href }) => `<a href="${href}" class="a">${children}</a>`
			})
		}
	})

	return {
		projects
	}
}
