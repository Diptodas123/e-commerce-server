import { addProductReview, getProductReviews } from '#controllers/review.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import express from 'express';

const router = express.Router();

// All review routes require authentication and user role
router.use(authMiddleware, requiresRole('user'));

router
    .post('/add', addProductReview)
    .get('/:productId', getProductReviews);

export default router;