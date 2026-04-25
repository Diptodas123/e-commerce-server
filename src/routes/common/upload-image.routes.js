import { Router } from 'express';
import  {handleImageUpload} from '#controllers/common/image-upload.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import { upload } from '#utils/imageUpload.js';

const router = Router();

router.use(authMiddleware);

/**
* @openapi
* /api/upload-image:
*   post:
*     tags: [Admin - Image Upload]
*     summary: Upload a image to Cloudinary (admin only)
*     description: Uploads an image file to Cloudinary and returns the image URL. This endpoint is intended for admin use to upload product images or feature banner images.
*     security: [{ cookieAuth: [] }]
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               image:
*                 type: string
*                 format: binary
*     responses:
*       200: { description: Image uploaded, returns imageUrl }
* 
*/
router.post('/',
    upload.single('image'),
    handleImageUpload
);

export default router;