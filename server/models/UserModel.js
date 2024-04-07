import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

export default mongoose.model("user", UserModel);