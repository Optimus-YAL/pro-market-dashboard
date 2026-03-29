// ============================================================
// Prisma Client Singleton — Prisma 7 with Driver Adapter
// ============================================================

import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'node:path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Resolve the SQLite database path relative to the prisma directory
  const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
  const adapter = new PrismaBetterSqlite3(dbPath);
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
