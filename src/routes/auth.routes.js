import express from 'express';
import { registerUser, loginUser, logoutUser, userInfo } from '../controllers/auth.controller.js';
import { authMiddleware } from '#middlewares/authMiddleware.js';

const router = express.Router();

router
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser)
    .get("/user-info", authMiddleware, userInfo);

export default router;