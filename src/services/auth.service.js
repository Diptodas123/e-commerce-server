import logger from "#config/logger.js";
import { User } from "#models/Users.js"
import { ConflictError, UnauthorizedError } from "#utils/errors.js";
import { jwtToken } from "#utils/jwt.js";
import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const registerUserInDB = async (userName, email, password, role) => {
    logger.info("User registration attempt by " + email);

    const existingUser = await User.findOne({ email });

    // Check if user already exists
    if (existingUser) {
        throw new ConflictError("User already exists with this email, please login instead");
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        role
    });
    await newUser.save();

    // Return the newly created user (excluding password)
    return {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role
    };
}

export const authenticateUser = async (res, email, password) => {
    logger.info("User login attempt by " + email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    // Compare provided password with stored hashed password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const token = jwtToken.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        userName: user.userName
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Return user details (excluding password)
    return {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role
    };
}