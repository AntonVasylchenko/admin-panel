import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { collectionModel, productModel } from "./index.js";

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


MediaSchema.post("deleteOne", { document: true, query: false }, async function (doc) {
  try {
    await Promise.all([
      deleteMediaFromOtherDocuments(collectionModel, doc.path),
      deleteMediaFromOtherDocuments(productModel, doc.path)
    ]);
    console.log("Media deleted from other documents successfully.");
  } catch (error) {
    console.error("Error deleting media from other documents:", error);
  }
});

async function deleteMediaFromOtherDocuments(model, value) {
  try {
    const result = await model.updateMany(
      { images: value },
      { $pull: { images: value } }
    );
    console.log(`Media deleted from ${model.modelName} documents:`, result);
  } catch (error) {
    console.error(`Error deleting media from ${model.modelName} documents:`, error);
    throw error;
  }
}



MediaSchema.methods.findDeleteMedia = async function () {
  if (!this.public_id) return;
  
  cloudinary.v2.uploader
  .destroy(this.public_id)
  .then(result => console.log(result));
};




export const Media = mongoose.model("Media", MediaSchema);
export default Media

