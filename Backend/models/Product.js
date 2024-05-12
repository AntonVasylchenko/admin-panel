import mongoose from "mongoose";
import { Log } from "./Log.js";
import { createLogDb, updateLogDb } from "../utility/utiltityLog.js";
import { Collection } from "./Collection.js";

export const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide product title"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "active"],
        message: "{VALUE} is not supported",
      },
      default: "draft",
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  const isUniqueName = await isUniqName(this.title);
  if (isUniqueName) {
    throw new Error("Product name has already existed");
  }
  next();
});

ProductSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (doc) {
    await Collection.updateMany(
      { products: doc._id },
      { $pull: { products: doc._id } }
    );
  }
);

ProductSchema.methods.handleDbLog = async function (name, action, id) {
  const formLogData = { action, name };
  switch (action) {
    case "Created":
      await createLogDb(formLogData, "product", id, Log);
      break;
    case "Changed":
    case "Deleted":
      await updateLogDb(formLogData, { product: id }, Log);
      break;
    default:
      break;
  }
};

export const Product = mongoose.model("Product", ProductSchema);

async function isUniqName(title) {
  const product = await Product.findOne({ title });
  return product ? true : false;
}

export default Product;
