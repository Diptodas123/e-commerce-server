import authRoutes from '#routes/common/auth.routes.js';
import featureRoutes from '#routes/common/feature.routes.js';
import uploadImageRoutes from '#routes/common/upload-image.routes.js';
import adminProductRoutes from '#routes/admin/products.routes.js';
import adminOrderRoutes from '#routes/admin/orders.routes.js';
import cartRoutes from '#routes/shop/cart.routes.js';
import addressRoutes from '#routes/shop/address.routes.js';
import shoppingRoutes from '#routes/shop/product.routes.js';
import shoppingOrderRoutes from '#routes/shop/order.routes.js';
import reviewRoutes from '#routes/shop/review.routes.js';
import searchRoutes from '#routes/shop/search.routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '#config/swagger.js';

export const registerRoutes = (app) => {
    // Health check
    app.use('/api/health', (req, res) => {
        res.status(200).json({ message: 'Server is healthy' });
    });

    // API Docs
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Common routes
    app.use('/api/auth', authRoutes);
    app.use('/api/feature-images', featureRoutes);
    app.use('/api/upload-image', uploadImageRoutes);

    // Admin routes
    app.use('/api/admin/products', adminProductRoutes);
    app.use('/api/admin/orders', adminOrderRoutes);

    // Shop routes
    app.use('/api/shop/cart', cartRoutes);
    app.use('/api/shop/address', addressRoutes);
    app.use('/api/shop/products', shoppingRoutes);
    app.use('/api/shop/orders', shoppingOrderRoutes);
    app.use('/api/shop/reviews', reviewRoutes);
    app.use('/api/shop/search', searchRoutes);
};
