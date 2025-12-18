import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnection = async () => {
  try {
    const mongoDbConnection = await mongoose.connect(
      process.env.MONGODB_CONNECT_URL,
      {
        dbName: process.env.DB_NAME, // Ensure this matches your database name
        // useNewUrlParser: true,
        // useUnifiedTopology: true, // optional but recommended
      }
    );
    console.log(
      `Connected to MongoDB at: ${mongoDbConnection.connection.host} and dbName : ${process.env.DB_NAME}`
    );
    console.log("MongoDB connection successful!");
    console.log("________________");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default dbConnection;
