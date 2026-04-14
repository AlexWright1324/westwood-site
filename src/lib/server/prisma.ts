import { PrismaClient } from "../../../prisma/generated/client"
import { PrismaBunSqlite } from "prisma-adapter-bun-sqlite"
import { env } from "$env/dynamic/private"

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set")

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaBunSqlite({ url: env.DATABASE_URL })
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
