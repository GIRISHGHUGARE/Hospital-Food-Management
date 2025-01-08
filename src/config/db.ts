import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        // If already connected, skip connection
        console.log('MongoDB is already connected');
        return;
    }
    try {
        // Connecting to the MongoDB database
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Stop the app if database connection fails
    }
};

export default connectDB;
