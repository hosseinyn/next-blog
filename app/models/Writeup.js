import mongoose from "mongoose";

const WriteUpSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description : { type: String , required: true },
    text : { type: String , required: true },
    user_name : { type: String , required: true },
    category : { type: String , requried: true },
  },
  { timestamps: true }
);


if (mongoose.models.Writeup) {
  delete mongoose.models.Writeup;
}

const Writeup = mongoose.model("Writeup", WriteUpSchema);
export default Writeup;
