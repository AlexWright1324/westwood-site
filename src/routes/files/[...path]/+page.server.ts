import type { Actions, PageServerLoad } from "./$types"
import { readdir, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

const basedir = "files"
const getPath = (pathslug: string) => join(basedir, pathslug)

const ls = async (pathslug: string) => {
	const exists = existsSync(basedir)
	if (!exists) {
		await mkdir(basedir, { recursive: true })
	}

	const files = await readdir(getPath(pathslug), { withFileTypes: true })

	return files.map((file) => ({
		name: file.name,
		type: file.isDirectory() ? "folder" : "file"
	}))
}

export const load: PageServerLoad = async ({ params }) => {
	const { path } = params

	return {
		path,
		streamed: {
			files: ls(path)
		}
	}
}

export const actions = {
	newFolder: async ({ request, params: { path } }) => {
		// TODO: Sanitize folder name
		// TODO: Authorise user

		const formData = await request.formData()
		const folderName = formData.get("folderName") as string

		await mkdir(getPath(join(path, folderName))).catch((err) => {
			console.error(err)
		})
	}
} satisfies Actions
