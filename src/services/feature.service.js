import { Feature } from '#models/Feature.js';

export const saveFeatureImageInDB = async (image) => {
    const newFeatureImage = new Feature({ image });
    return await newFeatureImage.save();
};

export const getAllFeatureImagesFromDB = async () => {
    return await Feature.find({}).sort({ createdAt: -1 });
};

export const deleteFeatureImageFromDB = async (id) => {
    return await Feature.findByIdAndDelete(id);
};
