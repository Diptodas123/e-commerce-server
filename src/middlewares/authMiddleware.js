import { UnauthorizedError } from "#utils/errors.js";
import { jwtToken } from "#utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
        throw new UnauthorizedError("Authentication token is missing");
    }

    const decoded = jwtToken.verify(token);
    
    if (!decoded) {
        throw new UnauthorizedError("Invalid or expired authentication token");
    }
    
    req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
    };

    next();
};