import mongoose from "mongoose";
import dotenv from 'dotenv'

export const connectDB =async()=>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_STRING);
    console.log(`database connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

}