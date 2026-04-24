import {
    addProductReviewInDatabase,
    getProductReviewsFromDatabase
} from '#services/review.service.js';
import { asyncHandler } from "#middlewares/errorHandler.js";
import { BadRequestError, InternalServerError } from "#utils/errors.js";
import { responseSuccess, sendCreated } from "#utils/response.js";
import { createReviewSchema } from '#validations/review.validation.js';

const addProductReview = asyncHandler(async (req, res) => {
    const validationResult = createReviewSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new BadRequestError('Invalid review data', validationResult.error.errors);
    }

    const newReview = await addProductReviewInDatabase(validationResult.data);
    if (!newReview) {
        throw new InternalServerError('Failed to add review');
    }

    return sendCreated(res, newReview, 'Review added successfully');
});

const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        throw new BadRequestError('Product ID is required');
    }

    const result = await getProductReviewsFromDatabase(productId);
    return responseSuccess(res, result, 'Product reviews fetched successfully');
});

export { addProductReview, getProductReviews };