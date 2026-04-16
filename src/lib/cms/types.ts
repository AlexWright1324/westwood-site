import { config } from "$lib/cms/config"
import type { Picture } from "@sveltejs/enhanced-img"
import { fieldProcessors } from "$lib/cms/content"

type Config = typeof config

type Prettify<T> = { [K in keyof T]: T[K] } & {}

type FieldProcessorsMap = typeof fieldProcessors

type WidgetValue<F> = F extends { widget: infer W extends keyof FieldProcessorsMap }
	? ReturnType<FieldProcessorsMap[W]>
	: F extends { widget: "list"; fields: infer SubFields extends readonly any[] }
		? Array<Prettify<ResolveFields<SubFields>>>
		: F extends { widget: "list" }
			? string[]
			: unknown

type ResolveFields<Fields extends readonly any[]> = {
	[F in Fields[number] as F extends { name: infer N extends string } ? N : never]: WidgetValue<F>
}

export type Entry<Name extends string> = Prettify<
	ResolveFields<
		Extract<Extract<Config["collections"][number], { folder: string }>, { name: Name }>["fields"]
	> & { slug: string }
>

export type FileEntry<CollectionName extends string, FileName extends string> = Prettify<
	ResolveFields<
		Extract<
			Extract<
				Extract<Config["collections"][number], { files: readonly any[] }>,
				{ name: CollectionName }
			>["files"][number],
			{ name: FileName }
		>["fields"]
	>
>
