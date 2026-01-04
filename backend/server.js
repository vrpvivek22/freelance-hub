import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./database/connect.js";

dotenv.config();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`This server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

start();
