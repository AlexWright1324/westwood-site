import type { SEOPageData } from "$lib/components/SEO.svelte"

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env
			ctx: ExecutionContext
			caches: CacheStorage
			cf?: IncomingRequestCfProperties
		}

		// interface Error {}
		// interface Locals {}
		interface PageData {
			seo: SEOPageData
		}
		// interface PageState {}
	}
}

export {}
