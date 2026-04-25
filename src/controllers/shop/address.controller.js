import logger from "#config/logger.js";
import { asyncHandler } from "#middlewares/errorHandler.js";
import {
    addNewAddressToDB,
    getAllAddressesFromDB,
    editAddressInDB,
    deleteAddressFromDB
} from "#services/shop/address.service.js";
import { BadRequestError, NotFoundError } from "#utils/errors.js";
import { sendCreated, sendSuccess } from "#utils/response.js";
import { addressSchema } from "#validations/address.validation.js";

export const addAddress = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const validationResult = addressSchema.safeParse(req.body);
    console.log(req.body);

    if (!validationResult.success) {
        console.log(validationResult?.error);
        throw new BadRequestError('Invalid address data', validationResult.error.errors);
    }

    const { address, city, postalCode, country, phone, notes } = validationResult.data;

    const newAddress = await addNewAddressToDB(
        userId,
        address,
        city,
        postalCode,
        country,
        phone,
        notes
    );

    logger.info(`Address added for user: ${userId}`);
    return sendCreated(res, newAddress, 'Address added successfully');
});

export const fetchAllAddresses = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const addressList = await getAllAddressesFromDB(userId);
    return sendSuccess(res, addressList, 'Addresses fetched successfully');
});

export const editAddress = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    if (!addressId) {
        throw new BadRequestError('Address ID is required');
    }

    const editedAddress = await editAddressInDB(
        userId,
        addressId,
        req.body
    );

    if (!editedAddress) {
        throw new NotFoundError('Address not found to edit');
    }

    logger.info(`Address edited for user: ${userId}, addressId: ${addressId}`);
    return sendSuccess(res, editedAddress, 'Address edited successfully');
});

export const deleteAddress = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    if (!addressId) {
        throw new BadRequestError('Address ID is required');
    }

    const deletedAddress = await deleteAddressFromDB(userId, addressId);

    if (!deletedAddress) {
        throw new NotFoundError('Address not found to delete');
    }

    logger.info(`Address deleted for user: ${userId}, addressId: ${addressId}`);
    return sendSuccess(res, deletedAddress, 'Address deleted successfully');
});
