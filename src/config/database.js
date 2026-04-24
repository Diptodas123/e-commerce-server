import mongoose from 'mongoose';
import logger from '#config/logger.js';

const DATABASE_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.syhmumn.mongodb.net/?appName=Cluster0`;
    
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
        logger.error('Error connecting to MongoDB:', err);
    }
};

export default connectToDatabase;
