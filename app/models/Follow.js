import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    target : { type: String , required: true },
  },
  { timestamps: true }
);


if (mongoose.models.Follow) {
  delete mongoose.models.Follow;
}

const Follow = mongoose.model("Follow", FollowSchema);
export default Follow;
