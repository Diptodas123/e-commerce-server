import { asyncHandler } from "#middlewares/errorHandler.js";
import { addProductToCart, getCartProductsForUser, removeProductFromCart, updateProductQuantity } from "#services/cart.service.js";
import { BadRequestError, NotFoundError } from "#utils/errors.js";
import { sendCreated, sendSuccess } from "#utils/response.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return BadRequestError("Product ID and quantity are required");
    }
    const newCartItem = await addProductToCart(productId, quantity, req.user.id);

    return sendCreated(res, newCartItem, "Product added to cart successfully");
});

export const getCartItems = asyncHandler(async (req, res) => {
    const allCartItems = await getCartProductsForUser(req.user.id);
    if (!allCartItems) {
        return NotFoundError("No cart items found for the user");
    }

    return sendSuccess(res, allCartItems, "Cart items retrieved successfully");
});

export const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        return BadRequestError("Product ID is required");
    }

    const removedCartItem = await removeProductFromCart(productId, req.user.id);

    return sendSuccess(res, removedCartItem, "Product removed from cart successfully");
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    
    if (!productId || !quantity) {
        return BadRequestError("Product ID and quantity are required");
    }

    const updatedCartItem = await updateProductQuantity(productId, quantity, req.user.id);

    if (!updatedCartItem) {
        return NotFoundError("Unable to update cart item quantity");
    }

    return sendSuccess(res, updatedCartItem, "Cart item quantity updated successfully");
});
