import { asyncHandler } from "#middlewares/errorHandler.js";
import { responseSuccess } from "#utils/response.js";
import { getProductsByFilters } from "#services/product.service.js";

export const getFilteredProducts = asyncHandler(async (req, res) => {
    const products = await getProductsByFilters();
    if (!products) {
        return responseSuccess(res, [], "No products found");
    }

    return responseSuccess(res, products, "Products retrieved successfully");
});
