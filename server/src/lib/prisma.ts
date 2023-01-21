import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
  log: ["query"],
});

// for logging {log:["query"]}
