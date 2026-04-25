import { asyncHandler } from "#middlewares/errorHandler.js";
import { sendSuccess } from "#utils/response.js";
import { fetchAllOrdersFromDB, fetchOrderByDetailsForAdminFromDB, updateOrderStatusInDB } from "#services/common/order.service.js";
import { BadRequestError } from "#utils/errors.js";
import { capturePaypalPayment, createNewOrderInDB, fetchAllOrdersByUserFromDB, fetchOrderByDetailsFromDB } from "#services/common/order.service.js";
import { sendCreated } from "#utils/response.js";
import { orderSchema, capturePaymentSchema } from "#validations/order.validation.js";

export const fetchAllOrdersForAdmin = asyncHandler(async (req, res) => {
    const orders = await fetchAllOrdersFromDB();
    return sendSuccess(res, orders, 'Fetched all orders for admin successfully');
});

export const getOrderByDetailsForAdmin = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const order = await fetchOrderByDetailsForAdminFromDB(orderId);
    return sendSuccess(res, order, `Fetched order ${orderId} for admin successfully`);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const orderId = req.params.id;    
    const { status } = req.body;

    const order = await updateOrderStatusInDB(orderId, status);

    return sendSuccess(res, order, `Order ${orderId} status updated to ${status} successfully`);
});

