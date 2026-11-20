import { PrismaClient } from "@prisma/client";

// Single shared instance so we don't exhaust the Postgres connection pool
// across hot reloads in dev.
export const prisma = new PrismaClient();
