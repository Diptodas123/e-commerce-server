import express from 'express';
import { registerUser, loginUser, logoutUser, userInfo } from '../../controllers/common/auth.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, email, password]
 *             properties:
 *               userName: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       201: { description: User registered successfully }
 *       400: { description: Validation error or user already exists }
 *
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Login successful, sets auth cookie }
 *       401: { description: Invalid credentials }
 *
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout and clear auth cookie
 *     responses:
 *       200: { description: Logged out successfully }
 *
 * /api/auth/user-info:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user info
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: User info returned }
 *       401: { description: Unauthorized }
 */
router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)
    .get("/user-info", authMiddleware, userInfo);

export default router;