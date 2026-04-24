import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Feature = mongoose.model('Feature', featureSchema);