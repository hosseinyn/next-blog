import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    verifyToken: { type: String, required: false },
    verifyTokenExpiry: { type: Date, required: false },
    is_verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);


if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model("User", UserSchema);
export default User;
