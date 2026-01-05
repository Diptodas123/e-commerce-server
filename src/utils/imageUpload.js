import multer from 'multer';
import cloudinary from '#config/cloudinary.js';

const storage = multer.memoryStorage();

const imageUploadUtilToCloudinary = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });

    return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtilToCloudinary };