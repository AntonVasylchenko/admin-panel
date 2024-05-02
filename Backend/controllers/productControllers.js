import { Media } from "../models/Media.js";
import { Product } from "../models/Product.js";

import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";

export async function createProduct(req, res) {
  let media = [];
  if (typeof req.body.media === "string" && req.body.media.length) {
    for (const mediaId of req.body.media.split(",")) {
      const mediaElement = await Media.findOne({ _id: mediaId });
      if (!mediaElement) {
        throw new customError.BadRequestError(`No Media with id: ${mediaId} `);
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
    throw new customError.BadRequestError("Product was not created");
  }
  res.status(StatusCodes.CREATED).json({ product });
}
export async function getSinleProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new customError.BadRequestError(`Product not found with ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
}
export async function getAllProducts(req, res) {
  const products = await Product.find({});
  if (!products) {
    throw new customError.BadRequestError("Products not found");
  }
  res.status(StatusCodes.OK).json({ products });
}
export async function updateProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new customError.BadRequestError(`Product not found with ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
}
export async function deleteProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new customError.BadRequestError(`Product not found with ${productId}`);
  }

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Product deleted" });
}
