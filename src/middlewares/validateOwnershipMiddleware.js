import { ForbiddenError } from "#utils/errors.js";

export const validateOwnershipMiddleware = (req, res, next) => {
    if (req.user && req.params?.userId) {
        if (req.user.id !== req.params.userId) {
            return ForbiddenError('You do not have permission to access this resource.');
        }
    }
    next();
};
