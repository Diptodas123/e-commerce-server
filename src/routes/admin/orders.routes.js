import express from "express";
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";
import {
    fetchAllOrdersForAdmin,
    getOrderByDetailsForAdmin,
    updateOrderStatus
} from "#controllers/admin/order.controller.js";

const router = express.Router();

// Endpoints accessible to all authenticated admin
router.use(authMiddleware, requiresRole('admin'));

/**
 * @openapi
 * /api/admin/orders:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Fetch all orders (admin)
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: List of all orders }
 *
 * /api/admin/orders/{id}:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Get order details by ID (admin)
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order details }
 *       404: { description: Order not found }
 *   put:
 *     tags: [Admin - Orders]
 *     summary: Update order status (admin)
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderStatus]
 *             properties:
 *               orderStatus: { type: string }
 *     responses:
 *       200: { description: Order status updated }
 *       404: { description: Order not found }
 */
// -------- Admin Routes --------
router
    .get("/",
        fetchAllOrdersForAdmin
    )
    .get("/:id",
        getOrderByDetailsForAdmin
    )
    .put("/:id",
        updateOrderStatus
    );

export default router;
