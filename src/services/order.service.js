import { Order } from "#models/Order.js";
import { Cart } from "#models/Cart.js";
import paypalOrdersController from "#config/paypal.js";
import logger from "#config/logger.js";
import { convertINRtoUSD } from "#utils/currencyConverter.js";
import { NotFoundError, BadRequestError } from "#utils/errors.js";
import { Product } from "#models/Product.js";

export const createNewOrderInDB = async (orderData, userId) => {

    const {
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        paymentId,
        payerId
    } = orderData;

    logger.info('Creating PayPal order', { userId, totalAmount, currency: 'INR' });

    // Convert INR to USD for PayPal (sandbox requires USD)
    const totalAmountUSD = await convertINRtoUSD(totalAmount);
    const cartItemsUSD = await Promise.all(
        cartItems.map(async (item) => ({
            ...item,
            priceUSD: await convertINRtoUSD(item.price)
        }))
    );

    // Build PayPal order request with USD amounts
    const paypalOrderRequest = buildPayPalOrderRequest(cartItemsUSD, totalAmountUSD);

    // Create order in PayPal
    const { result: paypalOrder } = await paypalOrdersController.createOrder({
        body: paypalOrderRequest,
    });

    // Save order to database (paymentId will be stored during capture)
    const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        paymentId,
        payerId
    });

    const savedOrder = await newlyCreatedOrder.save();

    // Extract approval URL from PayPal response
    const approvalURL = paypalOrder.links.find(link =>
        link.rel === 'approve'
    ).href;

    return {
        order: savedOrder,
        approvalURL,
        orderId: savedOrder._id,
    };
};

export const capturePaypalPayment = async (paymentId, payerId, orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    // Check if payment already captured
    if (order.paymentStatus === 'paid') {
        throw new BadRequestError('Payment already captured');
    }

    const { result: capturedOrder } = await paypalOrdersController.captureOrder({
        id: paymentId
    });

    // Update order status in the database
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Clear user's cart after successful payment
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    const productsPurchased = order.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    // Update stock for purchased products
    await updateStockAfterPurchase(productsPurchased);

    return order;
};

const buildPayPalOrderRequest = (cartItemsWithUSD, totalAmountUSD) => {
    return {
        intent: 'CAPTURE',
        purchaseUnits: [
            {
                amount: {
                    currencyCode: 'USD',
                    value: totalAmountUSD.toFixed(2),
                    breakdown: {
                        itemTotal: {
                            currencyCode: 'USD',
                            value: totalAmountUSD.toFixed(2)
                        }
                    }
                },
                items: cartItemsWithUSD.map(item => ({
                    name: item.title,
                    sku: item.productId,
                    unitAmount: {
                        currencyCode: 'USD',
                        value: item.priceUSD.toFixed(2)
                    },
                    quantity: item.quantity.toString()
                }))
            }
        ],
        applicationContext: {
            returnUrl: 'http://localhost:5173/shop/payment-success',
            cancelUrl: 'http://localhost:5173/shop/payment-cancel',
            brandName: 'E-Commerce Store',
            landingPage: 'NO_PREFERENCE',
            userAction: 'PAY_NOW'
        }
    };
};

export const fetchAllOrdersByUserFromDB = async (userId) => {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders;
};

export const fetchOrderByDetailsFromDB = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
};

export const fetchAllOrdersFromDB = async () => {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders) {
        throw new NotFoundError('No orders found');
    }
    return orders;
};

export const fetchOrderByDetailsForAdminFromDB = async (orderId) => {
    const order = await Order.findById(orderId).populate('userId', 'userName email');
    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
};

export const updateOrderStatusInDB = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
    );

    if (!order) {
        throw new NotFoundError('Order not found');
    }

    return order;
};

const updateStockAfterPurchase = async (productsPurchased) => {
    const updatePromises = productsPurchased.map(async (item) => {
        const product = await Product.findOneAndUpdate(
            { 
                _id: item.productId,
                totalStock: { $gte: item.quantity } // Ensure sufficient stock exists
            },
            { $inc: { totalStock: -item.quantity } },
            { new: true, runValidators: true }
        );

        if (!product) {
            logger.warn(`Product not found or insufficient stock: ${item.productId}`);
            throw new BadRequestError(`Insufficient stock for product ${item.productId}`);
        }

        logger.info(`Stock updated for product ${item.productId}: ${product.totalStock}`);
        return product;
    });

    await Promise.all(updatePromises);
};