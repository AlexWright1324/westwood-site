import { marked, type Renderer } from "marked"
import { JSDOM } from "jsdom"
import DOMPurify from "dompurify"

const window = new JSDOM("").window
const DP = DOMPurify(window)

const renderer: Partial<Renderer> = {
	heading({ tokens, depth }) {
		const text = (this as any as Renderer).parser.parseInline(tokens)
		return `<h${depth} class="h${depth}">${text}</h${depth}>`
	},
	code({ text, lang }) {
		const languageClass = lang ? ` language-${lang}` : ""
		return `<pre class="pre"><code class="code${languageClass}">${text}</code></pre>`
	},
	blockquote({ tokens }) {
		const content = (this as any as Renderer).parser.parse(tokens)
		return `<blockquote class="blockquote">${content}</blockquote>`
	},
	html({ text }) {
		return text
	},
	hr() {
		return '<hr class="hr" />'
	},
	list(token) {
		const listTypeClass = token.ordered ? "list-decimal" : "list-disc"
		const startAttr = token.ordered && token.start ? ` start="${token.start}"` : ""
		const tag = token.ordered ? "ol" : "ul"
		const body = token.items.map((item) => (this as any as Renderer).listitem(item)).join("")
		return `<${tag}${startAttr} class="list-inside ${listTypeClass} space-y-2">${body}</${tag}>`
	},
	listitem(item) {
		return `<li>${item.text}</li>`
	},
	checkbox({ checked }) {
		return `<input type="checkbox" disabled ${checked ? "checked" : ""} />`
	},
	paragraph({ tokens }) {
		const content = (this as any as Renderer).parser.parseInline(tokens)
		return `<p>${content}</p>`
	},
	table(token) {
		return `<div class="table-wrap"><table class="table">\n<thead>${token.header}</thead>\n<tbody>${token.rows}</tbody>\n</table></div>`
	},
	tablerow({ text }) {
		return `<tr>${text}</tr>`
	},
	tablecell(token) {
		const tag = token.header ? "th" : "td"
		const align = token.align ? ` style="text-align:${token.align}"` : ""
		return `<${tag}${align}>${token.text}</${tag}>`
	},
	strong({ tokens }) {
		const content = (this as any as Renderer).parser.parseInline(tokens)
		return `<strong>${content}</strong>`
	},
	em({ tokens }) {
		const content = (this as any as Renderer).parser.parseInline(tokens)
		return `<em>${content}</em>`
	},
	codespan({ text }) {
		return `<code class="code">${text}</code>`
	},
	br() {
		return "<br />"
	},
	del({ tokens }) {
		const content = (this as any as Renderer).parser.parseInline(tokens)
		return `<del class="del">${content}</del>`
	},
	link({ href, title, tokens }) {
		const content = (this as any as Renderer).parser.parseInline(tokens)
		const titleAttr = title ? ` title="${title}"` : ""
		return `<a class="anchor" href="${href}"${titleAttr}>${content}</a>`
	},
	image({ href, title, text }) {
		const titleAttr = title ? ` title="${title}"` : ""
		return `<img src="${href}" alt="${text}"${titleAttr} />`
	}
}

marked.use({ renderer })

export const generateMarkdown = async (markdown: string) => {
	return DP.sanitize(await marked(markdown))
}

export const htmlToText = (html: string) => {
	const window = new JSDOM(html).window
	const parser = window.document
	const walker = parser.createTreeWalker(parser, window.NodeFilter.SHOW_TEXT, null)

	const textParts: string[] = []
	while (walker.nextNode()) {
		if (walker.currentNode.textContent) textParts.push(walker.currentNode.textContent)
	}

	return textParts.join("\n")
}
