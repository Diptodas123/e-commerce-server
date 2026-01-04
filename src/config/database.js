import mongoose from 'mongoose';

const DATABASE_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.syhmumn.mongodb.net/?appName=Cluster0`;
    
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default connectToDatabase;
