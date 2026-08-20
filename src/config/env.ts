import "dotenv/config.js";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

export const env = envSchema.parse(process.env);
