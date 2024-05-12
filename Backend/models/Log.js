import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["Created", "Changed", "Deleted"],
      required: [true, "Please provide type of action"],
    },
    name: {
      type: String,
      required: [true, "Please provide name that has been changed"],
    },
    media: {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", LogSchema);
export default Log
