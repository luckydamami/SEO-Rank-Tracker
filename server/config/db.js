import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB is connected Succssfully!"),
    );
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("DB is not connected!", error.message);
  }
};

export default connectDB;