import { searchProducts } from "#controllers/shop/search.controller.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { requiresRole } from "#middlewares/requiresRole.js";
import express from 'express';

const router = express.Router();

router.use(authMiddleware, requiresRole('user'));

/**
 * @openapi
 * /api/shop/search/products:
 *   get:
 *     tags: [Shop - Search]
 *     summary: Search products by keyword
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema: { type: string }
 *         description: Search term to match against product title, description, brand, or category
 *     responses:
 *       200: { description: Matching products }
 *       400: { description: Keyword is required }
 */
router.get("/products", searchProducts);

export default router;
