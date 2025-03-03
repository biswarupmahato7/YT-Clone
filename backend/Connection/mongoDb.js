import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            tls: true,
            family: 4,
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
};

export default connectToDatabase;
