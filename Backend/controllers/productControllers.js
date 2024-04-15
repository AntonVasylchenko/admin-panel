import { Media } from "../models/Media.js";
import { Product } from "../models/Product.js";

export async function createProduct(req, res) {
  try {
    let media = [];
    for(const mediaId of req.body.media) {
      const mediaElement = await Media.findOne({ _id: mediaId });
      if (!mediaElement) {
        throw new Error(`No Media with id: ${mediaId} `);
      }
      media.push(mediaElement.path);
    }
    req.body.images = [...media];
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
}
export async function getSinleProduct(req, res) {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error(`Product not found with ${productId}`);
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    if (!products) {
      throw new Error("Products not found");
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}
export async function updateProduct(req, res) {
  try {
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

  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}
export async function deleteProduct(req, res) {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error(`Product not found with ${productId}`);
    }

    await Product.deleteOne();
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}
