import { Router } from "express";
import { createMedia, deleteMedia,allMedia } from "../controllers/mediaConrollers.js";

const router = Router();

router.get("/", allMedia);
router.post("/", createMedia);
router.delete("/:id", deleteMedia);

export default router
