import { Collection } from "../models/Collection.js";
import { Media } from "../models/Media.js";
import { Product } from "../models/Product.js";

import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";
import { createArrayDb } from "../utility/utiltityMongo.js";

async function getAllCollection(req, res) {
    const collections = await Collection.find({});
  if (!collections) {
    throw new customError.BadRequestError("Collections not found");
  }
  res.status(StatusCodes.OK).json({ collections });
}
async function createCollection(req, res) {
  const { title, media, tags, products } = req.body;
  if (!title) {
    throw new customError.BadRequestError("Please provide collection title");
  }

  const productModel = await createArrayDb(products, Product, "Product", "_id");
  const mediaModel = await createArrayDb(media, Media, "Media", "path");
  const collectionData = {
    ...req.body,
    images: mediaModel || [],
    products: productModel || [],
    tags: typeof tags === "string" ? tags.split(",") : "",
  };

    const collection = await Collection.create(collectionData);
    if (!collection) {
      throw new customError.BadRequestError("Collection was not created");
    }

    res.status(StatusCodes.CREATED).json({ collection });
}
async function getSingleCollection(req, res) {
  res.send("Get single collection");
}
async function updateCollection(req, res) {
  res.send("Update single collection");
}
async function removeCollection(req, res) {
  res.send("Remove single collection");
}

const collectionContollers = {
  getAllCollection,
  createCollection,
  getSingleCollection,
  updateCollection,
  removeCollection,
};

export default collectionContollers;
