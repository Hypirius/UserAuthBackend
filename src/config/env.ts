import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as dotenvConfig } from 'dotenv';

interface configType {
  PORT: number;
  DB_NAME: string;
  DB_URL: string;
  NODE_ENV: string;
  __dirname: string;
  __filename: string;
  CORS_ORIGIN: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_DURATION_DAYS: number;
  JWT_ACCESS_DURATION_MINS: number;
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvConfig({
  path: path.join(__dirname, '../../', `.env.${NODE_ENV}.local`),
});

const PORT = Number(process.env.PORT) || 3000;

const config: configType = {
  PORT,
  DB_NAME: process.env.DB_NAME || 'test',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
  NODE_ENV,
  __dirname,
  __filename,
  CORS_ORIGIN: process.env.CORS_ORIGIN || `https://localhost:${PORT}`,
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET ||
    Buffer.from('development-access-secret', 'utf8').toString('base64'),
  JWT_REFRESH_SECRET:
    process.env.JWT_ACCESS_SECRET ||
    Buffer.from('development-refresh-secret', 'utf8').toString('base64'),
  JWT_REFRESH_DURATION_DAYS: Number(process.env.JWT_REFRESH_DURATION_DAYS) || 7,
  JWT_ACCESS_DURATION_MINS: Number(process.env.JWT_ACCESS_DURATION_MINS) || 30,
};

export default Object.freeze(config);
