import { 
    capturePayment, 
    createOrder,
    getAllOrdersByUser, 
    getOrderByDetails 
} from "#controllers/order.controller.js";
import express from "express";
import { requiresRole } from '#middlewares/requiresRole.js';
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";

const router = express.Router();

router.use(authMiddleware, requiresRole('user'));

router.post("/", createOrder);

// Validate ownership for routes with :userId or :id params
router.use(validateOwnershipMiddleware);

router.post("/capture-payment/:userId", capturePayment);
router.get("/user-orders/:userId", getAllOrdersByUser);
router.get("/details/:userId/:id", getOrderByDetails);

export default router;
