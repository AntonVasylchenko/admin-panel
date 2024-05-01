import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      trim: true,
      required: [true, "Please provide media path"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide media name"],
    }
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", MediaSchema);
