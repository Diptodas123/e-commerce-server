import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from '#config/database.js';
import { corsConfig } from '#config/corsConfig.js';
import helmet from 'helmet';
import logger from '#config/logger.js';
import { registerRoutes } from '#routes/index.js';

export const app = express();

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Custom CSP for Swagger UI (keep CSP enabled)
app.use('/api/docs', helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
        },
    },
}));
app.use((req, res, next) => {
    logger.info(`${req.method} - ${req.originalUrl} - ${req.ip}`);
    logger.info(`Request body: ${JSON.stringify(req.body && req.body.password
        ? { ...req.body, password: "*******" }    //Masking password
        : req.body)}`
    );
    next();
});

// Database connection
connectToDatabase();

// Routes
registerRoutes(app);

export default app;