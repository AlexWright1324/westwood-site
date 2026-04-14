import { sequence } from "@sveltejs/kit/hooks"
import { handle as authHandler } from "$lib/server/auth"

export const handle = sequence(authHandler)
