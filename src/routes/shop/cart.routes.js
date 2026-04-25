import express from 'express';
import {
    addToCart,
    getCartItems,
    removeFromCart,
    updateCartItemQuantity
} from '#controllers/shop/cart.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import { validateOwnershipMiddleware } from '#middlewares/validateOwnershipMiddleware.js';

const router = express.Router();

// Authenticate all cart routes and ensure the user has the 'user' role and owns the cart they're trying to access
router.use(
    authMiddleware,
    requiresRole('user'),
    validateOwnershipMiddleware
);

/**
 * @openapi
 * /api/shop/cart/{userId}:
 *   get:
 *     tags: [Shop - Cart]
 *     summary: Get cart items for a user
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Cart items }
 *   post:
 *     tags: [Shop - Cart]
 *     summary: Add an item to the cart
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId: { type: string }
 *               quantity: { type: integer }
 *     responses:
 *       200: { description: Item added to cart }
 *
 * /api/shop/cart/{userId}/{productId}:
 *   put:
 *     tags: [Shop - Cart]
 *     summary: Update cart item quantity
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity: { type: integer }
 *     responses:
 *       200: { description: Quantity updated }
 *   delete:
 *     tags: [Shop - Cart]
 *     summary: Remove an item from the cart
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Item removed }
 */
router
    .post('/:userId', addToCart)
    .get('/:userId', getCartItems)
    .delete('/:userId/:productId', removeFromCart)
    .put('/:userId/:productId', updateCartItemQuantity);

export default router;
