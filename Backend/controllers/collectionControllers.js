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
  let otherModel = {
    media: [],
    product: []
  }
  if (!title) {
    throw new customError.BadRequestError("Please provide collection title");
  }

  if (products) {
    otherModel.product = await createArrayDb(products, Product, "Product", "_id")
  }
  if (media) {
    otherModel.media =  await createArrayDb(media, Media, "Media", "path");

  }
  const collectionData = {
    ...req.body,
    images: otherModel.media,
    products: otherModel.product,
    tags: typeof tags === "string" ? tags.split(",") : "",
  };

  const collection = await Collection.create(collectionData);
  if (!collection) {
    throw new customError.NotFoundError("Collection was not created");
  }

  res.status(StatusCodes.CREATED).json({ collection });
}
async function getSingleCollection(req, res) {
  const { id: collectionId } = req.params;
  const collection = await Collection.findOne({ _id: collectionId });
  if (!collection) {
    throw new customError.NotFoundError(
      `Collection with id:${req.params.id} not found`
    );
  }
  res.status(StatusCodes.OK).json({ collection });
}
async function updateCollection(req, res) {
  const { id: collectionId } = req.params;
  const { media, tags, products  } = req.body;
  const updateObject = {
    ...req.body
  }
  if (media) {
    updateObject.media = await createArrayDb(media, Media, "Media", "path");
  }

  if (products !== "" && products.length !== 0 ) {
    updateObject.products = await createArrayDb(products, Product, "Product", "_id");
  }
  if (tags) {
    updateObject.tags = tags.split(",");
  }
  const collection = await Collection.findByIdAndUpdate(
    { _id: collectionId },
    updateObject,
    { runValidators: true, new: true }
  );
  if (!collection) {
    throw new customError.NotFoundError(
      `Collection with id:${req.params.id} not found`
    );
  }
  res.status(StatusCodes.OK).json({collection});
}
async function removeCollection(req, res) {
  const { id: collectionId} = req.params;
  const collection = await Collection.findOne({ _id: collectionId });
  if (!collection) {
    throw new customError.NotFoundError(
      `Collection with id:${req.params.id} not found`
    );
  }
  await collection.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Colection deleted" });
}

async function getSeveralCollection(req,res) {
  const { listId } = req.query;

  console.log(listId);

  const products = await Promise.all(
    [...listId.split(",")]
      .filter(id => id !== "")
      .map(async (productId) => {
        console.log(productId);
      const productElement = await Product.findById({ _id: productId });
      if (!productElement) {
        throw new customError.NotFoundError(`No Product with id: ${productId}`);
      }
      return productElement;
    })
  );

  res.status(StatusCodes.OK).json({ products});
}

const collectionContollers = {
  getAllCollection,
  createCollection,
  getSingleCollection,
  updateCollection,
  removeCollection,
  getSeveralCollection
};

export default collectionContollers;
