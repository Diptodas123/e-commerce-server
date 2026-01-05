import express from 'express';
import { handleImageUpload } from '#controllers/admin.controller.js';
import { upload } from '#utils/imageUpload.js';

const router = express.Router();

//----------------- Product Routes -----------------//

// Image upload route 
router.post('/products/upload-image', upload.single('image'), handleImageUpload);

export default router;