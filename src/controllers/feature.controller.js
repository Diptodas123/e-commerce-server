import { asyncHandler } from "#middlewares/errorHandler.js";
import { BadRequestError, InternalServerError, NotFoundError } from "#utils/errors.js";
import { responseSuccess } from "#utils/response.js";
import { getAllFeatureImagesFromDB, saveFeatureImageInDB, deleteFeatureImageFromDB } from "#services/feature.service.js";

const addFeatureImage = asyncHandler(async (req, res) => {
    const { image } = req.body;
    if (!image) {
        throw new BadRequestError('Image URL is required');
    }

    const newFeatureImage = await saveFeatureImageInDB(image);
    if (!newFeatureImage) {
        throw new InternalServerError('Failed to save feature image');
    }

    return responseSuccess(res, newFeatureImage, 'Feature image added successfully');
});

const getFeatureImages = asyncHandler(async (req, res) => {
    const featureImages = await getAllFeatureImagesFromDB();
    if (!featureImages) {
        throw new InternalServerError('Failed to fetch feature images');
    }

    return responseSuccess(res, featureImages, 'Feature images fetched successfully');
});

const deleteFeatureImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await deleteFeatureImageFromDB(id);
    if (!deleted) {
        throw new NotFoundError('Feature image not found');
    }

    return responseSuccess(res, deleted, 'Feature image deleted successfully');
});

export { addFeatureImage, getFeatureImages, deleteFeatureImage };