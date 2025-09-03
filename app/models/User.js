import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetToken: { type: String , required: false },
  resetTokenExpiry: { type: Date , required: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
