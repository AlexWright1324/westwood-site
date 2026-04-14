import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "$lib/server/prisma"

export const { handle } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	providers: [
		Credentials({
			credentials: {
				email: {
					type: "email",
					label: "Email",
					placeholder: "johndoe@example.com"
				},
				password: {
					type: "password",
					label: "Password",
					placeholder: "*****"
				}
			},
			authorize: async (credentials) => {
				// TODO: Add password verification logic here

				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string
					}
				})

				if (!user) {
					throw new Error("Invalid credentials.")
				}

				return user
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) token.sub = user.id
			return token
		},
		session: async ({ session, token }) => {
			if (session.user && token.sub) {
				session.user.id = token.sub
			}
			return session
		}
	}
})
