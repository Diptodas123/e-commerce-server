import {
    capturePayment,
    createOrder,
    getAllOrdersByUser,
    getOrderByDetails
} from "#controllers/shop/order.controller.js";
import express from "express";
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";

const router = express.Router();

// Endpoints accessible for authenticated users with 'user' role

router.use(authMiddleware, requiresRole('user'));

/**
 * @openapi
 * /api/shop/orders:
 *   post:
 *     tags: [Shop - Orders]
 *     summary: Create a new order
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, cartItems, addressInfo, totalAmount]
 *             properties:
 *               userId: { type: string }
 *               cartItems: { type: array, items: { type: object } }
 *               addressInfo: { type: object }
 *               totalAmount: { type: number }
 *     responses:
 *       201: { description: Order created, returns PayPal approval URL }
 *
 * /api/shop/orders/capture-payment/{userId}:
 *   post:
 *     tags: [Shop - Orders]
 *     summary: Capture PayPal payment and confirm order
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
 *             required: [paymentId, payerId, orderId]
 *             properties:
 *               paymentId: { type: string }
 *               payerId: { type: string }
 *               orderId: { type: string }
 *     responses:
 *       200: { description: Payment captured and order confirmed }
 *
 * /api/shop/orders/user-orders/{userId}:
 *   get:
 *     tags: [Shop - Orders]
 *     summary: Get all orders for a user
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of user orders }
 *
 * /api/shop/orders/details/{userId}/{id}:
 *   get:
 *     tags: [Shop - Orders]
 *     summary: Get order details
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order details }
 *       404: { description: Order not found }
 */
router.post("/", createOrder);

// Validate ownership for routes with :userId or :id params
router.use(validateOwnershipMiddleware);

router
    .post("/capture-payment/:userId", capturePayment)
    .get("/user-orders/:userId", getAllOrdersByUser)
    .get("/details/:userId/:id", getOrderByDetails);

export default router;
