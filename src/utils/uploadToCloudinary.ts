import { v2 as cloudinary, type UploadApiOptions } from 'cloudinary';
import ApiError from './ApiErrorClass.js';
import config from '../config/env.js';

// TODO: Implement virus scanning to images
// ADD better error handling
// Potentially move this config to the config folder

cloudinary.config({
  cloud_name: config.CLOUDINARY_API_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 15000,
});

const defaultUploadOptions: UploadApiOptions = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  transformation: [{ quality: true }, { format: 'auto' }],
};

const uploadImage = async (imagePath: string, options: UploadApiOptions) => {
  try {
    return await cloudinary.uploader.upload(imagePath, {
      ...options,
      ...defaultUploadOptions,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(503, 'Unable to save image');
  }
};

export default uploadImage;
