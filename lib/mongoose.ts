import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("DB url not found");
  if (isConnected) return console.log("Connect to the Database");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
