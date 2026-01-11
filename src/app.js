import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from '#config/database.js';
import { corsConfig } from '#config/corsConfig.js';
import authRoutes from '#routes/auth.routes.js';
import adminRoutes from '#routes/admin.routes.js';
import shoppingRoutes from '#routes/shop.routes.js';
import cartRoutes from '#routes/cart.routes.js';

export const app = express();

app.use(cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

connectToDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shoppingRoutes);
app.use('/api/cart', cartRoutes);

export default app;