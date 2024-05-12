import { Router } from "express";
import { collectionContollers } from "../controllers/index.js";

const router = Router();

router
  .route("/")
  .get(collectionContollers.getAllCollection)
  .post(collectionContollers.createCollection);

router
  .route("/:id")
  .get(collectionContollers.getSingleCollection)
  .patch(collectionContollers.updateCollection)
  .delete(collectionContollers.removeCollection);

export default router;