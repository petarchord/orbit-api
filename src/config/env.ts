import "dotenv/config.js";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
});

export const env = envSchema.parse(process.env);
