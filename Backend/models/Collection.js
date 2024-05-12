import mongoose from "mongoose";
const CollecionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide collection title"],
    },
    images: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const Collection = mongoose.model("Collection", CollecionSchema);
export default Collection;
