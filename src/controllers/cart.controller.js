import { asyncHandler } from "#middlewares/errorHandler.js";
import { addProductToCart, getCartProductsForUser, updateProductQuantity } from "#services/cart.service.js";
import { BadRequestError, NotFoundError } from "#utils/errors.js";
import { sendCreated, sendSuccess } from "#utils/response.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity, user } = req.body;

    if (!productId || !quantity) {
        return BadRequestError("Product ID and quantity are required");
    }
    const newCartItem = await addProductToCart(productId, quantity, user.id);

    return sendCreated(res, "Product added to cart successfully", newCartItem);
});

export const getCartItems = asyncHandler(async (req, res) => {
    const allCartItems = await getCartProductsForUser(req.user.id);
    if (!allCartItems) {
        return NotFoundError("No cart items found for the user");
    }

    return sendSuccess(res, "Cart items retrieved successfully", allCartItems);
});

export const removeFromCart = asyncHandler(async (req, res) => {
    
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { user, productId, quantity } = req.body;

    if(!productId || !quantity) {
        return BadRequestError("Product ID and quantity are required");
    }

    const updatedCartItem = await updateProductQuantity(productId, quantity, user.id);

    if(!updatedCartItem) {
        return NotFoundError("Unable to update cart item quantity");
    }

    return sendSuccess(res, "Cart item quantity updated successfully", updatedCartItem);
});
