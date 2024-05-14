import { Router } from "express";
import { logControllers } from "../controllers/index.js";

const router = Router();

router
  .route("/")
  .get(logControllers.getAllLog)
  .post(logControllers.createLog)
  .delete(logControllers.removeAllLog);

router
  .route("/:id")
  .get(logControllers.getSingleLog)
  .patch(logControllers.changeLog)
  .delete(logControllers.removeSingleLog);

export default router;
