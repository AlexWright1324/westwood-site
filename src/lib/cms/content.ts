import { config } from "$lib/cms/config"
import matter from "gray-matter"
import { generateMarkdown } from "$lib/markdown"
import type { Field } from "@sveltia/cms"
import type { Entry, FileEntry } from "$lib/cms/types"
import type { Picture } from "@sveltejs/enhanced-img"

const allMarkdownFiles = import.meta.glob<string>("/content/**/*.md", {
	query: "?raw",
	eager: true,
	import: "default"
})

const allEnhancedImages = import.meta.glob<Picture>(
	"/src/lib/assets/uploads/**/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}",
	{
		eager: true,
		query: {
			enhanced: true
		},
		import: "default"
	}
)

const allSVGFiles = import.meta.glob<string>("/content/**/*.svg", {
	eager: true,
	query: "?url",
	import: "default"
})

export const fieldProcessors = {
	string: (value: unknown) => value as string,
	markdown: (value: unknown) => generateMarkdown(value as string),
	datetime: (value: unknown) => value as string,
	image: (value: unknown) => {
		const str = value as string
		const enhanced = allEnhancedImages[str]
		if (enhanced) return enhanced

		const svg = allSVGFiles[str]
		if (svg) return svg

		// Remote URL
		return str
	}
} as const

const processField = (value: unknown, field: Field): unknown => {
	if (field.widget === "list") {
		if (!Array.isArray(value)) return []
		if (!("fields" in field)) return value as string[]

		const subFields = field.fields as Field[]
		return value.map((item: Record<string, unknown>) =>
			Object.fromEntries(
				subFields
					.filter((sub) => item[sub.name] !== undefined)
					.map((sub) => [sub.name, processField(item[sub.name], sub)])
			)
		)
	}

	const processor = fieldProcessors[field.widget as keyof typeof fieldProcessors]
	if (processor) {
		return processor(value)
	}

	throw new Error(`Unsupported widget type: ${field.widget}`)
}

export const getEntryCollection = <
	CollectionName extends Extract<(typeof config.collections)[number], { folder: string }>["name"]
>(
	collectionName: CollectionName
): Entry<CollectionName>[] => {
	const collection = config.collections.find((c) => c.name === collectionName)
	if (!collection) throw new Error(`"${collectionName}" is not a valid collection`)
	if (!("folder" in collection)) throw new Error(`"${collectionName}" is not a folder collection`)

	const prefix = collection.folder.endsWith("/") ? collection.folder : `${collection.folder}/`

	return Object.entries(allMarkdownFiles)
		.filter(([path]) => path.startsWith(prefix))
		.map(([path, raw]) => {
			const slug = path.split("/").pop()!.replace(/\.md$/, "")
			const { data } = matter(raw)

			const transformedData = Object.fromEntries(
				collection.fields
					.filter((field) => data[field.name] !== undefined)
					.map((field) => [field.name, processField(data[field.name], field)])
			)

			return { slug, ...transformedData } as unknown as Entry<CollectionName>
		})
}

export const getFile = <
	CollectionName extends Extract<
		(typeof config.collections)[number],
		{ files: readonly any[] }
	>["name"],
	FileName extends Extract<
		Extract<(typeof config.collections)[number], { name: CollectionName }>["files"][number],
		{ name: string }
	>["name"]
>(
	collectionName: CollectionName,
	fileName: FileName
): FileEntry<CollectionName, FileName> => {
	const collection = config.collections.find((c) => c.name === collectionName)
	if (!collection) throw new Error(`"${collectionName}" is not a valid collection`)
	if (!("files" in collection)) throw new Error(`"${collectionName}" is not a file collection`)

	const file = collection.files.find((f: any) => f.name === fileName)
	if (!file)
		throw new Error(`"${fileName}" is not a valid file in the "${collectionName}" collection`)

	const raw = allMarkdownFiles[file.file]
	if (!raw) throw new Error(`File "${file.file}" not found`)

	const { data } = matter(raw)

	const processField = (value: unknown, field: any): unknown => {
		if (field.widget === "list") {
			if (!Array.isArray(value)) return []
			if (!("fields" in field)) return value as string[]

			const subFields = field.fields as any[]
			return value.map((item: Record<string, unknown>) =>
				Object.fromEntries(
					subFields
						.filter((sub) => item[sub.name] !== undefined)
						.map((sub) => [sub.name, processField(item[sub.name], sub)])
				)
			)
		}

		const processor = fieldProcessors[field.widget as keyof typeof fieldProcessors]
		if (processor) {
			return processor(value)
		}

		throw new Error(`Unsupported widget type: ${field.widget}`)
	}

	return Object.fromEntries(
		file.fields
			.filter((field: any) => data[field.name] !== undefined)
			.map((field: any) => [field.name, processField(data[field.name], field)])
	) as unknown as FileEntry<CollectionName, FileName>
}
