import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!

/**
 * Connects to the MongoDB database using Mongoose.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");

    // Listen for disconnection events
    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected");
    });

    // Handle reconnection
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
