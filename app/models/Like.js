import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    post_title: { type: String , required: true }
    
  },
  { timestamps: true }
);


if (mongoose.models.Like) {
  delete mongoose.models.Like;
}

const Like = mongoose.model("Like", LikeSchema);
export default Like;
