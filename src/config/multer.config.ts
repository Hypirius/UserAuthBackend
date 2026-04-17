import { type Request } from 'express';
import crypto from 'node:crypto';
import multer, { type FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../public/temp');
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
