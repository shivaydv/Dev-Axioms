import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Load .env.local first (Next.js convention), then fall back to .env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
