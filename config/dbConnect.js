import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database successfully connected");
  } catch (error) {
    console.log(`Mongo DB Connection Error in Config.js :- ${error}`);
  }
};
export default dbConnect;
