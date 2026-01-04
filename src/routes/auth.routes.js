import express from 'express';
import { registerUser, loginUser, logoutUser, checkUserAuth } from '../controllers/auth.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, checkUserAuth);

export default router;