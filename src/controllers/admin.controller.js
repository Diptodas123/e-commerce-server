import { asyncHandler } from "#middlewares/errorHandler.js";
import { imageUploadUtilToCloudinary } from "#utils/imageUpload.js";
import { responseSuccess } from "#utils/response.js";

export const handleImageUpload = asyncHandler(async (req, res) => {
    const b64Image = Buffer.from(req?.file?.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64Image;

    const result = await imageUploadUtilToCloudinary(url);
    
    return responseSuccess(
        res,
        { imageUrl: result.url },
        "Image uploaded successfully",
        200
    );
});
