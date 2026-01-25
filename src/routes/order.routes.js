import {
    capturePayment,
    createOrder,
    getAllOrdersByUser,
    getOrderByDetails,
    fetchAllOrdersForAdmin,
    getOrderByDetailsForAdmin
} from "#controllers/order.controller.js";
import express from "express";
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";

const router = express.Router();

// Endpoints accessible to all authenticated users
router.use(authMiddleware);

// -------- Admin Routes --------
router.get("/admin/orders", requiresRole('admin'), fetchAllOrdersForAdmin);
router.get("/admin/order-details/:id", requiresRole('admin'), getOrderByDetailsForAdmin);

// ------------------------------------------------------------------------

// -------- User Routes --------
router.use(requiresRole('user'));

router.post("/", createOrder);

// Validate ownership for routes with :userId or :id params
router.use(validateOwnershipMiddleware);

router
    .post("/capture-payment/:userId", capturePayment)
    .get("/user-orders/:userId", getAllOrdersByUser)
    .get("/details/:userId/:id", getOrderByDetails);

export default router;
