import { asyncHandler } from "#middlewares/errorHandler.js";
import { responseSuccess, sendNotFound } from "#utils/response.js";
import { getProductsByFilters, getProductById } from "#services/shop.service.js";
import { BadRequestError } from "#utils/errors.js";

export const getFilteredProducts = asyncHandler(async (req, res) => {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    const products = await getProductsByFilters(category, brand, sortBy);
    if (!products) {
        return sendNotFound(res, "No products found");
    }

    return responseSuccess(res, products, "Products retrieved successfully");
});

export const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!id){
        return BadRequestError("Product ID is required");
    }

    const product = await getProductById(id);
    if(!product){
        return sendNotFound(res, "Product not found");
    }

    return responseSuccess(res, product, "Product details retrieved successfully");
});
