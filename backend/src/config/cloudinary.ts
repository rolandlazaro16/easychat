import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'easychat',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'wav', 'webm', 'ogg'],
      resource_type: 'auto', // Allows non-image files like video/audio
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
