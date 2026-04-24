import { addFeatureImage, getFeatureImages, deleteFeatureImage } from '#controllers/feature.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import Router from 'express';

const router = Router();

router
    .post('/', authMiddleware, requiresRole('admin'), addFeatureImage)
    .get('/', getFeatureImages)
    .delete('/:id', authMiddleware, requiresRole('admin'), deleteFeatureImage);

export default router;
