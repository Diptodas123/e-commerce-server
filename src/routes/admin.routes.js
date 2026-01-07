import express from 'express';
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from '#controllers/admin.controller.js';
import { upload } from '#utils/imageUpload.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

//----------------- Product Routes -----------------//
router.post('/products', requiresRole('admin'), addProduct);
router.put('/products/:id', requiresRole('admin'), editProduct);
router.delete('/products/:id', requiresRole('admin'), deleteProduct);

//----------------- Image Upload Route -----------------//
router.post('/products/upload-image', requiresRole('admin'), upload.single('image'), handleImageUpload);

//----------------- Fetch All Products Route -----------------//
router.get('/products', fetchAllProducts);

export default router;