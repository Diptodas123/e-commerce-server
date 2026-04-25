import { addFeatureImage, getFeatureImages, deleteFeatureImage } from '#controllers/common/feature.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import Router from 'express';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/feature-images:
 *   get:
 *     tags: [Feature Images]
 *     summary: Get all feature banner images
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: List of feature images }
 *   post:
 *     tags: [Feature Images]
 *     summary: Add a new feature banner image (admin only)
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image: { type: string, description: Cloudinary image URL }
 *     responses:
 *       200: { description: Feature image added }
 *       400: { description: Image URL is required }
 *       403: { description: Forbidden }
 *
 * /api/feature-images/{id}:
 *   delete:
 *     tags: [Feature Images]
 *     summary: Delete a feature banner image (admin only)
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Feature image deleted }
 *       404: { description: Feature image not found }
 *       403: { description: Forbidden }
 */
router
    .post('/', requiresRole('admin'), addFeatureImage)
    .get('/', getFeatureImages)
    .delete('/:id', requiresRole('admin'), deleteFeatureImage);

export default router;
