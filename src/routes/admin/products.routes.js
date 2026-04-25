import express from 'express';
import {
    addProduct,
    deleteProduct,
    editProduct,
    fetchAllProducts,
} from '#controllers/admin/product.controller.js';
import { upload } from '#utils/imageUpload.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authMiddleware, requiresRole('admin'));

/**
 * @openapi
 * /api/admin/products:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Fetch all products
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: List of all products }
 *   post:
 *     tags: [Admin - Products]
 *     summary: Add a new product
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price, category, brand, totalStock, image]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               salePrice: { type: number }
 *               category: { type: string }
 *               brand: { type: string }
 *               totalStock: { type: integer }
 *               image: { type: string }
 *     responses:
 *       201: { description: Product created }
 *       400: { description: Validation error }
 *
 * /api/admin/products/{id}:
 *   put:
 *     tags: [Admin - Products]
 *     summary: Edit an existing product
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: Product updated }
 *       404: { description: Product not found }
 *   delete:
 *     tags: [Admin - Products]
 *     summary: Delete a product
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Product deleted }
 *       404: { description: Product not found }
 *
 */
router
    .post('/', addProduct)
    .put('/:id', editProduct)
    .delete('/:id', deleteProduct)
    .get('/', fetchAllProducts);

export default router;