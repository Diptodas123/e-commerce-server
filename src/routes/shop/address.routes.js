import {
    addAddress,
    deleteAddress,
    editAddress,
    fetchAllAddresses
} from "#controllers/shop/address.controller.js";
import { authMiddleware } from "#middlewares/authMiddleware.js";
import { requiresRole } from "#middlewares/requiresRole.js";
import { validateOwnershipMiddleware } from "#middlewares/validateOwnershipMiddleware.js";
import express from "express";

const router = express.Router();

// Apply authentication and authorization middlewares
router.use(authMiddleware, requiresRole("user"), validateOwnershipMiddleware);

/**
 * @openapi
 * /api/shop/address/{userId}:
 *   get:
 *     tags: [Shop - Address]
 *     summary: Get all addresses for a user
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of addresses }
 *   post:
 *     tags: [Shop - Address]
 *     summary: Add a new address
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
 *             required: [address, city, pincode, phone, notes]
 *             properties:
 *               address: { type: string }
 *               city: { type: string }
 *               pincode: { type: string }
 *               phone: { type: string }
 *               notes: { type: string }
 *     responses:
 *       201: { description: Address added }
 *
 * /api/shop/address/{userId}/{addressId}:
 *   put:
 *     tags: [Shop - Address]
 *     summary: Edit an address
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: Address updated }
 *   delete:
 *     tags: [Shop - Address]
 *     summary: Delete an address
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Address deleted }
 */
router
    .post("/:userId", addAddress)
    .get("/:userId", fetchAllAddresses)
    .put("/:userId/:addressId", editAddress)
    .delete("/:userId/:addressId", deleteAddress);

export default router;
