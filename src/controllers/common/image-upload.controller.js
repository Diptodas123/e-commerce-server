import { asyncHandler } from "#middlewares/errorHandler.js";
import { imageUploadUtilToCloudinary } from "#utils/imageUpload.js";
import { sendCreated } from "#utils/response.js";

export const handleImageUpload = asyncHandler(async (req, res) => {
    const b64Image = Buffer.from(req?.file?.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64Image;

    const result = await imageUploadUtilToCloudinary(url);

    return sendCreated(res, { imageUrl: result.url }, "Image uploaded successfully",);
});
