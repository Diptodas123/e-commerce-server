import { addProductReview, getProductReviews } from '#controllers/shop/review.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import express from 'express';

const router = express.Router();

// All review routes require authentication and user role
router.use(authMiddleware, requiresRole('user'));

/**
 * @openapi
 * /api/shop/reviews:
 *   post:
 *     tags: [Shop - Reviews]
 *     summary: Add a product review
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, reviewValue, reviewMessage]
 *             properties:
 *               productId: { type: string }
 *               reviewValue: { type: integer, minimum: 1, maximum: 5 }
 *               reviewMessage: { type: string }
 *     responses:
 *       201: { description: Review added }
 *       400: { description: Already reviewed this product }
 *
 * /api/shop/reviews/{productId}:
 *   get:
 *     tags: [Shop - Reviews]
 *     summary: Get reviews for a product
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of reviews }
 */
router
    .post('/', addProductReview)
    .get('/:productId', getProductReviews);

export default router;