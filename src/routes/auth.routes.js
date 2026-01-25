import express from 'express';
import { registerUser, loginUser, logoutUser, checkUserAuth } from '../controllers/auth.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)
    .get("/check-auth", authMiddleware, checkUserAuth);

export default router;