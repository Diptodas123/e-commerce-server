import express from 'express';
import { getFilteredProducts, getProductDetails } from '#controllers/shop/product.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/shop/products:
 *   get:
 *     tags: [Shop - Products]
 *     summary: Get filtered and sorted products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: brand
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [price-lowtohigh, price-hightolow, title-atoz, title-ztoa] }
 *     responses:
 *       200: { description: Filtered product list }
 *
 * /api/shop/products/{id}:
 *   get:
 *     tags: [Shop - Products]
 *     summary: Get product details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product details }
 *       404: { description: Product not found }
 */
router
    .get('/', getFilteredProducts)
    .get('/:id', getProductDetails);

export default router;
