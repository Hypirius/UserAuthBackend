import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as dotenvConfig } from 'dotenv';
import * as z from 'zod';

const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvConfig({
  path: path.join(__dirname, '../../', `.env.${NODE_ENV}.local`),
});

const validateEnvSchema = z.object({
  PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_URL: z.string(),
  NODE_ENV: z.string(),
  CORS_ORIGIN: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_DURATION_DAYS: z.coerce.number().min(1),
  JWT_ACCESS_DURATION_MINS: z.coerce.number().min(30),
  CLOUDINARY_API_URL: z.url(),
  CLOUDINARY_API_NAME: z.string(),
  CLOUDINARY_API_KEY: z.coerce.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const env = validateEnvSchema.parse(process.env);

export default Object.freeze(env);
