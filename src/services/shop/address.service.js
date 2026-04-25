import { Address } from '#models/shop/Address.js';
import mongoose from 'mongoose';

export const addNewAddressToDB = async (
    userId,
    address,
    city,
    postalCode,
    country,
    phone,
    notes
) => {
    const newAddress = new Address({
        userId,
        address,
        city,
        postalCode,
        country,
        phone,
        notes
    });
    await newAddress.save();
    return {
        _id: newAddress._id,
        address,
        city,
        postalCode,
        country,
        phone,
        notes
    };
}

export const getAllAddressesFromDB = async (userId) => {
    return await Address.find({ userId }, '_id address city postalCode country phone notes');
}

export const editAddressInDB = async (userId, addressId, updateAddressData) => {
    const address = await Address.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(addressId),
        userId
    }, updateAddressData, { 
        new: true, 
        select: '_id address city postalCode country phone notes' 
    });

    return address;
}

export const deleteAddressFromDB = async (userId, addressId) => {
    const address = await Address.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(addressId),
        userId
    });

    return address;
}