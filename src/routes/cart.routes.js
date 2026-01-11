import express from 'express';
import { addToCart, getCartItems, removeFromCart, updateCartItemQuantity } from '#controllers/cart.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { requiresRole } from '#middlewares/requiresRole.js';
import { validateOwnershipMiddleware } from '#middlewares/validateOwnershipMiddleware.js';

const router = express.Router();

// Authenticate all cart routes
router.use(authMiddleware);

// Only users can access cart routes
router.use(requiresRole('user'));
router.use(validateOwnershipMiddleware);

router.post('/', addToCart);
router.get('/', getCartItems);
router.delete('/:id', removeFromCart);
router.put('/:id', updateCartItemQuantity);

export default router;
