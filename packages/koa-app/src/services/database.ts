/* eslint-disable no-console */
import { mongoose } from "@typegoose/typegoose";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_DB_CONNECTION_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};

export default connect;
