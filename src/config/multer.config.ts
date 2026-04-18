import { type Request } from 'express';
import crypto from 'node:crypto';
import multer, { type FileFilterCallback } from 'multer';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Points to this current ESM ONLY and traverses from this file to the destination
const currentModuleAbsoluteFilePath = fileURLToPath(import.meta.url);
const currentModuleDir = dirname(currentModuleAbsoluteFilePath);

const pathToTempFolder = path.join(currentModuleDir, '../../', 'public/temp'); // Untested for actual directory

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathToTempFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + crypto.randomUUID() + '-' + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG or JPG are allowed'));
  }
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } });
