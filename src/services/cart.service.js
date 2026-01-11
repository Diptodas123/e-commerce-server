import { Cart } from "#models/Cart.js";
import { Product } from "#models/Product.js";
import { NotFoundError } from "#utils/errors.js";
import { sendNotFound } from "#utils/response.js";

export const addProductToCart = async (productId, quantity, userId) => {
    const product = await Product.findById(productId);
    if (!product) {
        return sendNotFound(null, "Product not found");
    }

    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
        cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);

        // If product not in cart, add it. If it is, update the quantity
        if (itemIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[itemIndex].quantity += quantity;
        }
    }

    await cart.save();
    return cart;
};

export const removeProductFromCart = async (productId) => {

};

export const updateProductQuantity = async (productId, quantity) => {
    const cart = await Cart.findOne({ userId });

    // If cart doesn't exist, return not found
    if (!cart) {
        return NotFoundError("Cart not found for the user");
    }

    // Find the index of the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() == productId);

    // If product not in cart, return not founf. If it is, update the quantity
    if (itemIndex === -1) {
        return NotFoundError("Product not found in cart");
    } else {
        cart.items[itemIndex].quantity += quantity;
    }

    await cart.save();

    await cart.populate({
        path: 'items.productId',
        select: 'image title price salePrice'
    });

    // Populate product details
    const populateCartProducts = cart.items.map(item => {
        const isValidProduct = item.productId !== null;
        return ({
            productId: isValidProduct ? item.productId._id : null,
            quantity: item.quantity,
            image: isValidProduct ? item.productId.image : null,
            title: isValidProduct ? item.productId.title : null,
            price: isValidProduct ? item.productId.price : null,
            salePrice: isValidProduct ? item.productId.salePrice : null
        })
    });

    return populateCartProducts;
};

export const getCartProductsForUser = async (userId) => {
    const cartProducts = await Cart.findOne({ userId }).populate({
        path: 'items.productId',
        select: 'image title price salePrice'
    });

    // Clean up any invalid product references if deleted by admin
    const validProducts = cartProducts?.items.filter(item => item.productId !== null) || [];

    if (validProducts.length < cartProducts.items.length) {
        cartProducts.items = validProducts;
        await cartProducts.save();
    }

    // Populate product details
    const populateCartProducts = validProducts.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice
    }));

    return populateCartProducts;
};
