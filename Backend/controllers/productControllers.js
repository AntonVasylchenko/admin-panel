import { Media } from "../models/Media.js";
import { Product } from "../models/Product.js";

export async function createProduct(req, res) {
  let media = [];
  if (typeof req.body.media === "string" && req.body.media.length) {
    for (const mediaId of req.body.media.split(",")) {
      const mediaElement = await Media.findOne({ _id: mediaId });
      if (!mediaElement) {
        throw new Error(`No Media with id: ${mediaId} `);
      }
      media.push(mediaElement.path);
    }
    req.body.images = [...media];
  }
  if (typeof req.body.tags === "string") {
    req.body.tags = req.body.tags.split(",");
  }

  

  const product = await Product.create(req.body);
  if (!product) {
    throw new Error("Product was not created");
  }
  res.status(201).json({ product });
}
export async function getSinleProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new Error(`Product not found with ${productId}`);
  }
  res.status(200).json({ product });
}
export async function getAllProducts(req, res) {
  const products = await Product.find({});
  if (!products) {
    throw new Error("Products not found");
  }
  res.status(200).json({ products });
}
export async function updateProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new Error(`Product not found with ${productId}`);
  }
  res.status(200).json({ product });
}
export async function deleteProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new Error(`Product not found with ${productId}`);
  }

  await Product.deleteOne();
  res.status(200).json({ msg: "Product deleted" });
}
