import { responseSuccess, sendSuccess } from "#utils/response.js";
import { asyncHandler } from "#middlewares/errorHandler.js";
import { BadRequestError } from "#utils/errors.js";
import logger from "#config/logger.js";
import { registerUserInDB, authenticateUser } from "#services/auth.service.js";
import { loginSchema, registerSchema } from "#validations/auth.validation.js";

export const registerUser = asyncHandler(async (req, res) => {

    // validate request body using Zod schema
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
        throw new BadRequestError("All fields are required and must be valid");
    }

    // Destructure validated data
    const { userName, email, password, role } = validationResult.data;

    // Register user in the database using the service
    const newUser = await registerUserInDB(userName, email, password, role);

    logger.info("New user registered", { userId: newUser.id, email: newUser.email });
    // Send success response
    return responseSuccess(res, { user: newUser }, "User registered successfully", 201);
});

export const loginUser = asyncHandler(async (req, res) => {

    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
        throw new BadRequestError("Email and password are required and must be valid");
    }

    const { email, password } = validationResult.data;

    const user = await authenticateUser(res, email, password);

    logger.info("User logged in", { userId: user.id, email: user.email });
    return responseSuccess(res, { user }, "Login successful", 200);
});

export const logoutUser = asyncHandler(async (req, res) => {
    logger.info("User logout", { userId: req.user?.id });

    res.clearCookie("token");

    return responseSuccess(res, null, "Logout successful", 200);
});

export const checkUserAuth = asyncHandler((req, res) => {
    const user = req.user;
    return sendSuccess(res, user, "User is authenticated", 200);
});