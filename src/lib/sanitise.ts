import { browser } from "$app/environment"

import DOMPurify from "dompurify"

export const sanitise = async (input: string): Promise<string> => {
	if (browser) return DOMPurify.sanitize(input)

	const { JSDOM } = await import("jsdom")
	const dom = new JSDOM("")
	const purify = DOMPurify(dom.window)
	return purify.sanitize(input)
}
