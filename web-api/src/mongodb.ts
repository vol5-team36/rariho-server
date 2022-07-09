import mongoose from "mongoose";
import config from "./config";

const DATABASE_URL =
  "mongodb://" +
  config.mongo.user +
  ":" +
  config.mongo.password +
  "@" +
  config.mongo.host +
  ":" +
  config.mongo.port +
  "/" +
  config.mongo.database +
  "?authMechanism=DEFAULT";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URL);
    console.log(`MongoDB Connected ${connection.connection.host}`);
  } catch (e: any) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};
