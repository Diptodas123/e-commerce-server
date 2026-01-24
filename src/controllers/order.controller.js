import { asyncHandler } from "#middlewares/errorHandler.js";
import { capturePaypalPayment, createNewOrderInDB, fetchAllOrdersByUserFromDB, fetchOrderByDetailsFromDB } from "#services/order.service.js";
import { BadRequestError } from "#utils/errors.js";
import { sendCreated, sendSuccess } from "#utils/response.js";
import { orderSchema, capturePaymentSchema } from "#validations/order.validation.js"

export const createOrder = asyncHandler(async (req, res) => {

    const validationResult = orderSchema.safeParse(req.body);

    if (!validationResult.success) {
        throw new BadRequestError('Invalid order data', validationResult.error.errors);
    }

    const userId = req.user.id;
    const { order, approvalURL, orderId } = await createNewOrderInDB(req.body, userId);

    if (!order) {
        throw new BadRequestError('Order creation failed');
    }

    return sendCreated(res, { order, approvalURL, orderId }, 'Order created successfully');
});

export const capturePayment = asyncHandler(async (req, res) => {
    const validationResult = capturePaymentSchema.safeParse(req.body);

    if (!validationResult.success) {
        throw new BadRequestError('Invalid payment data', validationResult.error.errors);
    }

    const { paymentId, payerId, orderId } = validationResult.data;

    const order = await capturePaypalPayment(paymentId, payerId, orderId);

    return sendSuccess(res, order, 'Payment captured successfully');
});

export const getAllOrdersByUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const orders = await fetchAllOrdersByUserFromDB(userId);
    return sendSuccess(res, orders, 'Fetched all orders successfully');
});

export const getOrderByDetails = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await fetchOrderByDetailsFromDB(orderId, userId);
    return sendSuccess(res, order, `Fetched order ${orderId} successfully`);
});