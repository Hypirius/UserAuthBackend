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
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenvConfig({
  path: path.join(__dirname, '../../', `.env.${NODE_ENV}.local`),
});

const config: configType = {
  PORT: Number(process.env.PORT) || 3000,
  DB_NAME: process.env.DB_NAME || 'test',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017',
  NODE_ENV,
  __dirname,
  __filename,
};

export default Object.freeze(config);
