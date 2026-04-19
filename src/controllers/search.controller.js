import { asyncHandler } from "#middlewares/errorHandler.js";
import { BadRequestError } from "#utils/errors.js";
import { responseSuccess } from "#utils/response.js";
import { getSearchResults } from "#services/search.service.js";

export const searchProducts = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    if (!keyword || typeof keyword !== 'string') {
        throw new BadRequestError("Keyword is required and should be a string");
    }

    // Create a case-insensitive regular expression for searching
    const regEx = new RegExp(keyword, 'i'); // Case-insensitive search

    const searchResults = await getSearchResults(regEx);
    return responseSuccess(res, searchResults, "Search results retrieved successfully");
});
