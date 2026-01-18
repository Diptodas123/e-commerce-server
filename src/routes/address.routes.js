import {
    addAddress,
    deleteAddress,
    editAddress,
    fetchAllAddresses
} from "#controllers/address.controller.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { requiresRole } from "#middlewares/requiresRole.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";
import express from "express";

const router = express.Router();

// Apply authentication and authorization middlewares
router.use(authMiddleware, requiresRole("user"), validateOwnershipMiddleware);

router.post("/:userId", addAddress);
router.get("/:userId", fetchAllAddresses);
router.put("/:userId/:addressId", editAddress);
router.delete("/:userId/:addressId", deleteAddress);

export default router;
