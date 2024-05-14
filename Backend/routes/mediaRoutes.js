import { Router } from "express";
import { mediaControllers } from "../controllers/index.js";

const router = Router();

router
  .route("/")
  .get(mediaControllers.allMedia)
  .post(mediaControllers.createMedia);

router.route("/:id").delete(mediaControllers.deleteMedia);

export default router;
