import { asyncHandler } from "#middlewares/errorHandler.js";
import { addProductToDB, deleteProductFromDB, editProductInDB, fetchAllProductsFromDB } from "#services/admin.service.js";
import { BadRequestError } from "#utils/errors.js";
import { imageUploadUtilToCloudinary } from "#utils/imageUpload.js";
import { responseSuccess, sendCreated } from "#utils/response.js";
import { productSchema } from "#validations/admin.validation.js";

export const handleImageUpload = asyncHandler(async (req, res) => {
    const b64Image = Buffer.from(req?.file?.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64Image;

    const result = await imageUploadUtilToCloudinary(url);

    return sendCreated(res, { imageUrl: result.url }, "Image uploaded successfully",);
});

export const addProduct = asyncHandler(async (req, res) => {

    // Validate request body using Zod schema
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
        const errors = validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        throw new BadRequestError("Invalid product data provided", { errors });
    }
    const productData = validationResult.data;

    const newProduct = await addProductToDB(productData);

    return sendCreated(res, newProduct, "Product added successfully");
});

export const fetchAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await fetchAllProductsFromDB();
    return responseSuccess(res, allProducts, "All products fetched successfully");
});

export const editProduct = asyncHandler(async (req, res) => {
    const productId = req.params?.id;
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
        const errors = validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        throw new BadRequestError("Invalid product data provided", { errors });
    }
    const updatedProductData = validationResult.data;
    const updatedProduct = await editProductInDB(productId, updatedProductData);

    if (!updatedProduct) {
        throw new BadRequestError("Product not found with the provided ID to update");
    }

    return responseSuccess(res, updatedProduct, "Product updated successfully");
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params?.id;
    const deletedProduct = await deleteProductFromDB(productId);

    if (!deletedProduct) {
        throw new BadRequestError("Product not found with the provided ID to delete");
    }

    return responseSuccess(res, deletedProduct, "Product deleted successfully");
});
