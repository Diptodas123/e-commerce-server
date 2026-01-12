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

router.post('/:userId', addToCart);
router.get('/:userId', getCartItems);
router.delete('/:productId/:userId', removeFromCart);
router.put('/:productId/:userId', updateCartItemQuantity);

export default router;
