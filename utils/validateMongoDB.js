import mongoose from "mongoose";

const validateMongoDBId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("Invalid MongoDB ID");
  }
};

export default validateMongoDBId;
