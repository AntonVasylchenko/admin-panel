import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      trim: true,
      required: [true, "Please provide media path"],
    },
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", MediaSchema);
