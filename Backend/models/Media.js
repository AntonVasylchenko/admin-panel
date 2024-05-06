import mongoose from "mongoose";
import cloudinary from "cloudinary";

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
    },
    public_id: {
      type: String
    }
  },
  { timestamps: true }
);

MediaSchema.methods.findDeleteMedia = async function () {
  if (!this.public_id) return;
  
  cloudinary.v2.uploader
  .destroy(this.public_id)
  .then(result => console.log(result));
};

export const Media = mongoose.model("Media", MediaSchema);
