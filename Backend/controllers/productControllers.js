import { Media } from "../models/Media.js";
import { Product } from "../models/Product.js";

import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";






async function createProduct(req, res) {
  const mediaIds = req.body.media?.split(",") || [];
  
  const mediaPaths = await Promise.all(
    [...mediaIds]
      .filter(id => id !== "")
      .map(async (mediaId) => {
      const mediaElement = await Media.findOne({ _id: mediaId });
      if (!mediaElement) {
        throw new customError.NotFoundError(`No Media with id: ${mediaId}`);
      }
      return mediaElement.path;
    })
  );

  const productData = {
    ...req.body,
    images: mediaPaths || [],
    tags:
      typeof req.body.tags === "string"
        ? req.body.tags.split(",")
        : req.body.tags,
  };

  const product = await Product.create(productData);
  if (!product) {
    throw new customError.BadRequestError("Product was not created");
  }

  const { type, action } = req.log;

  if (type && action) {
    await product.handleDbLog(type, action, product._id);
  }

  res.status(StatusCodes.CREATED).json({ product });
}
async function getSinleProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new customError.NotFoundError(`Product not found with ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
}
async function getAllProducts(req, res) {
  const availableStatus = ["draft", "active"];
  const availableSort = {
    latest: "-createdAt",
    oldest: "createdAt",
    "a-z": "title",
    "z-a": "-title",
  };

  const { status, sort, page = 1, limit = 6 } = req.query;
  const searchObject = {};

  if (status && availableStatus.includes(status)) {
    searchObject.status = status;
  }

  let productsQuery = Product.find(searchObject);

  if (sort && availableSort.hasOwnProperty(sort)) {
    productsQuery = productsQuery.sort(availableSort[sort]);
  }

  const skip = (page - 1) * limit;
  productsQuery = productsQuery.skip(skip).limit(parseInt(limit));

  const products = await productsQuery;

  if (!products || products.length === 0) {
    throw new customError.NotFoundError("Products not found");
  }

  const totalProduct = await Product.countDocuments(searchObject);
  const maxPages = Math.ceil(totalProduct / limit);

  res.status(StatusCodes.OK).json({
    products,
    currentCount: products.length,
    currentPage: page,
    totalProduct: totalProduct,
    maxPages: maxPages,
  });
}

async function updateProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new customError.NotFoundError(`Product not found with ${productId}`);
  }
  const { type, action } = req.log;

  if (type && action) {
    await product.handleDbLog(type, action, product._id);
  }
  res.status(StatusCodes.OK).json({ product });
}
async function deleteProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new customError.NotFoundError(`Product not found with ${productId}`);
  }

  const { type, action } = req.log;

  if (type && action) {
    await product.handleDbLog(type, action, product._id);
  }
  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Product deleted" });
}

const productControllers = {
  createProduct,
  getSinleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

export default productControllers;
