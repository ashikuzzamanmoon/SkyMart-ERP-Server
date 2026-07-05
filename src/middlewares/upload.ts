import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import AppError from '../errors/AppError';
import { Request } from 'express';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'skymart-products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  } as any,
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError(400, 'Not an image! Please upload only images.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;
