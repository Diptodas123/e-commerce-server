import logger from "#config/logger.js";
import { AppError } from "#utils/errors.js";

// Async handler wrapper to catch errors
export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            // Log error details
            logger.error({
                message: error.message || "Internal server error",
                statusCode: error.statusCode || 500,
                stack: error.stack,
                path: req.path,
                method: req.method,
            });

            // Handle operational errors (AppError instances)
            if (error instanceof AppError) {
                const response = {
                    status: error.status,
                    message: error.message,
                };
                if (error.data) {
                    response.data = error.data;
                }
                return res.status(error.statusCode).json(response);
            }

            // Handle unexpected errors
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    };
};
